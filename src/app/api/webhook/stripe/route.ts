import { plans } from "@/config/plans";
import { stripe } from "@/config/stripe";
import { prisma } from "@/lib/prisma";
import { handleSubscriptionCreated } from "@/lib/subscription";
import { SubscriptionStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
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

    const subscription = event.data.object as Stripe.Subscription;

    // Handle the event
    switch (event.type) {
      //リファクタリング後
      case "customer.subscription.created": {
        await handleSubscriptionCreated(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        // await handleSubscriptionDeleted(subscription);
        break;
      }

      // const session = event.data.object as Stripe.Checkout.Session;

      // if (!session.metadata || !session?.subscription) {
      //   return new NextResponse("Session Error", { status: 200 });
      // }

      // const subscription = await stripe.subscriptions.retrieve(
      //   session.subscription?.toString()
      // );
      // let subscriptionStatus: SubscriptionStatus = "FREE";

      // switch (subscription.items.data[0].price.id) {
      //   case "prod_RhIAKoVRviPYMs":
      //     subscriptionStatus = "STARTER";
      //     break;
      //   case "prod_RhIB7wyBIKcGRj":
      //     subscriptionStatus = "PRO";
      //     break;
      //   case "prod_RhIBJcQ1pm1QAY":
      //     subscriptionStatus = "ENTERPRISE";
      //     break;
      // }

      // //初回はサブスクリプション情報の登録のみ
      // await prisma.user.update({
      //   where: { clerkId: session.metadata.clerkId },
      //   data: {
      //     subscriptionStatus: subscriptionStatus,
      //     subscriptions: {
      //       create: {
      //         stripeSubscriptionId: subscription.id,
      //         stripePriceId: subscription.items.data[0].price.id,
      //         stripeCurrentPeriodEnd: new Date(
      //           subscription.current_period_end * 1000
      //         ),
      //       },
      //     },
      //   },
      // });

      // break;
      //リファクタリング前
      case "customer.subscription.updated":
        const subscriptionSesoion = event.data.object as Stripe.Subscription;

        if (subscriptionSesoion.status === "active") {
          let credits = 10;
          switch (subscriptionSesoion.items.data[0].price.id) {
            case "prod_RhIAKoVRviPYMs":
              credits = 50;
              break;
            case "prod_RhIB7wyBIKcGRj":
              credits = 120;
              break;
            case "prod_RhIBJcQ1pm1QAY":
              credits = 300;
              break;
          }

          await prisma.user.update({
            where: { stripeCustomerId: subscriptionSesoion.customer as string },
            data: {
              credits: credits,
              // subscriptions: {
              //   update: {
              //     stripeCurrentPeriodEnd: new Date(
              //       subscriptionSesoion.current_period_end * 1000
              //     ),
              //   },
              // },
            },
          });
        }

        break;
      default:
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
