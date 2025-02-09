import Stripe from "stripe";
import { prisma } from "./prisma";
import { Subscription, SubscriptionStatus } from "@prisma/client";
import { plans, STRIPE_PLANS } from "@/config/plans";

//ヘルパー関数
function getPlanDetails(subscription: Stripe.Subscription) {
  let priceId = subscription.items.data[0].price.id;
  let status: SubscriptionStatus = "FREE";
  let credits = 5;

  switch (priceId) {
    case "":
      status = "STARTER";
      credits = 50;
      break;
    case "":
      status = "PRO";
      credits = 120;
      break;
    case "":
      status = "ENTERPRISE";
      credits = 300;
      break;
  }

  return { priceId, status, credits };
}

export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription
) {
  const { priceId, status, credits } = getPlanDetails(subscription);

  return prisma.user.update({
    where: { stripeCustomerId: subscription.customer as string },
    data: {
      subscriptionStatus: status,
      credits: credits,
      subscriptions: {
        create: {
          stripeSubscriptionId: subscription.id,
          stripePriceId: "",
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      },
    },
  });
}

export async function handleSubscriptionUpdated() {}

export async function handleSubscriptionDeleted() {}
