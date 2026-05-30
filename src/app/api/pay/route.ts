import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    // ✅ Runtime pe initialize karo, module level pe nahi
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe key not configured" },
        { status: 500 },
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2025-06-30.basil",
    });

    const { plan, billing, paymentMethodId, amount } = await request.json();

    if (!plan || !billing || !paymentMethodId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "pkr",
      payment_method: paymentMethodId,
      confirm: true,
      metadata: { plan, billing },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    });

    return NextResponse.json({ status: "success", paymentIntent });
  } catch (error: unknown) {
    console.error("Payment error:", error);
    const message =
      error instanceof Error ? error.message : "Payment processing failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
