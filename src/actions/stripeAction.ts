"use server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
  typescript: true,
});
export async function createStripeSesstion(prevState: any, formData: FormData) {
  const priceId = formData.get("priceId") as string;

  const user = await currentUser();

  if (!user) {
    throw new Error("認証が必要です。");
  }
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.BASEURL}/dashboard/?success=true`,
      cancel_url: `${process.env.BASEURL}/dashboard/?canceled=true`,
    });

    if (!session.url) {
      throw new Error("セッションの作成に失敗しました。");
    }

    return {
      status: "success",
      error: "",
      redirectUrl: session.url,
    };
  } catch (error) {
    console.error("Stripe session creation error:", error);
    return {
      status: "error",
      error: "決済処理中にエラーが発生しました。",
      redirectUrl: "",
    };
  }
}
