import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil", // Updated to match the expected API version
});

export async function POST(request: Request) {
  try {
    const { plan, billing, paymentMethodId, amount } = await request.json();

    // Validate input
    if (!plan || !billing || !paymentMethodId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a PaymentIntent with the payment method ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert PKR to paisa
      currency: "pkr",
      payment_method: paymentMethodId,
      confirm: true,
      metadata: { plan, billing },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    });

    return NextResponse.json({ status: "success", paymentIntent });
  } catch (error: any) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed" },
      { status: 400 }
    );
  }
}
