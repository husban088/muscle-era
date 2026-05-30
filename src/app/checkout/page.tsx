"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

// ✅ Alag component banaya jo useSearchParams use karta hai
function CheckoutContent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan") || "Basic";
  const billing = searchParams.get("billing") || "monthly";

  const plans = {
    Basic: {
      monthlyPrice: "PKR 42,000 / Month",
      yearlyPrice: "PKR 98,000 / Year",
      features: [
        { text: "20 Trainings", active: true },
        { text: "Free shower & lockers", active: true },
        { text: "Reliable & Experienced Team", active: true },
        { text: "Free parking", active: true },
        { text: "5 Days Per Week", active: false },
        { text: "Nutrition Program", active: false },
      ],
    },
    Standard: {
      monthlyPrice: "PKR 56,000 / Month",
      yearlyPrice: "PKR 112,000 / Year",
      features: [
        { text: "20 Trainings", active: true },
        { text: "Free shower & lockers", active: true },
        { text: "Reliable & Experienced Team", active: true },
        { text: "Free parking", active: true },
        { text: "5 Days Per Week", active: true },
        { text: "Nutrition Program", active: false },
      ],
    },
    Premium: {
      monthlyPrice: "PKR 70,000 / Month",
      yearlyPrice: "PKR 154,000 / Year",
      features: [
        { text: "20 Trainings", active: true },
        { text: "Free shower & lockers", active: true },
        { text: "Reliable & Experienced Team", active: true },
        { text: "Free parking", active: true },
        { text: "5 Days Per Week", active: true },
        { text: "Nutrition Program", active: true },
      ],
    },
  };

  const selectedPlan = plans[planName as keyof typeof plans] || plans.Basic;
  const price =
    billing === "monthly"
      ? selectedPlan.monthlyPrice
      : selectedPlan.yearlyPrice;

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        planName={planName}
        billing={billing}
        price={price}
        selectedPlan={selectedPlan}
      />
    </Elements>
  );
}

// ✅ Default export mein Suspense wrap kiya
export default function Checkout() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#171717] min-h-screen flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutForm({
  planName,
  billing,
  price,
  selectedPlan,
}: {
  planName: string;
  billing: string;
  price: string;
  selectedPlan: { features: { text: string; active: boolean }[] };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsSubmitting(true);
    setError(null);
    setPaymentStatus("");

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError("Card number input not found");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            address: { postal_code: undefined },
          },
        });

      if (stripeError) {
        setError(stripeError.message || "Invalid card details");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: planName,
          billing,
          paymentMethodId: paymentMethod?.id,
          amount: parseInt(price.replace(/[^0-9]/g, "").split(" ")[0], 10),
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setPaymentStatus("Payment successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/success";
        }, 2000);
      } else {
        setError(result.error || "Payment failed");
      }
    } catch (_error) {
      setError("Payment failed: Network error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f1f1f",
        "::placeholder": { color: "#6b7280" },
      },
      invalid: { color: "#ef4444" },
    },
  };

  return (
    <section className="bg-[#171717] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 py-[10rem] sm:py-[4rem]">
        {/* Pricing Plan Summary */}
        <div className="bg-white rounded-sm shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {planName} Plan
          </h2>
          <p className="text-xl font-semibold text-gray-800 mb-4">{price}</p>
          <ul className="space-y-4">
            {selectedPlan.features.map((feature) => (
              <li key={feature.text} className="flex items-center gap-3">
                <CheckCircleIcon
                  className={`h-6 w-6 ${
                    feature.active ? "text-gray-800" : "text-gray-400"
                  }`}
                />
                <span className="text-gray-800">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Payment Form */}
        <div className="bg-white rounded-sm shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Enter Card Details
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-800 mb-1">Card Number</label>
              <CardNumberElement
                options={elementOptions}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 mb-1">
                  Expiry Date (MM/YY)
                </label>
                <CardExpiryElement
                  options={elementOptions}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-gray-800 mb-1">CVV</label>
                <CardCvcElement
                  options={elementOptions}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {paymentStatus && (
              <p
                className={`text-sm mt-4 ${
                  paymentStatus.includes("successful")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {paymentStatus}
              </p>
            )}
            <button
              onClick={handlePayment}
              disabled={!stripe || isSubmitting}
              className={`w-full bg-teal-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-600 transition-colors ${
                !stripe || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
