import { plans } from "@/config/plans";
import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/prisma";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  let event;
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers.get("stripestripe-signature") as string;
    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch {
      console.log(`⚠️  Webhook signature verification failed.`);
      return new NextResponse("Webhook Error", { status: 400 });
    }
  }

  if (!event) {
    return new NextResponse("Webhook Event Error", { status: 500 });
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.metadata || !session?.subscription) {
        return new NextResponse("Session Error", { status: 200 });
      }

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription?.toString()
      );
      let subscriptionStatus: SubscriptionStatus = "FREE";

      switch (subscription.items.data[0].price.id) {
        case "prod_RhIAKoVRviPYMs":
          subscriptionStatus = "FREE";
          break;
        case "prod_RhIB7wyBIKcGRj":
          subscriptionStatus = "PRO";
          break;
        case "prod_RhIBJcQ1pm1QAY":
          subscriptionStatus = "BASIC";
          break;
      }

      //初回はサブスクリプション情報の登録のみ
      await prisma.user.update({
        where: { clerkId: session.metadata.clerkId },
        data: {
          subscriptionStatus: subscriptionStatus,
          subscriptions: {
            create: {
              stripeSubscriptionId: subscription.id,
              stripePriceId: subscription.items.data[0].price.id,
              stripeCurrentPeriodEnd: new Date(subscription.current_period_end),
            },
          },
        },
      });

      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
}
