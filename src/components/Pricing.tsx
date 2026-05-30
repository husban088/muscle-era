"use client";

import { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Pricing() {
  const [activePlan, setActivePlan] = useState<"monthly" | "yearly">("monthly");
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [activePlan]);

  const plans = [
    {
      name: "Basic",
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
    {
      name: "Standard",
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
    {
      name: "Premium",
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
  ];

  const handleJoinNow = (planName: string) => {
    router.push(`/checkout?plan=${planName}&billing=${activePlan}`);
  };

  return (
    <section className="bg-[#171717] py-16 relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-contain bg-no-repeat bg-left opacity-30"
        style={{ backgroundImage: "url('/images/shape-95.png')" }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Pricing Plan
        </h1>
        <p className="text-xl text-white text-center mb-8">
          Find Your Perfect Plan
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActivePlan("monthly")}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              activePlan === "monthly"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setActivePlan("yearly")}
            className={`px-6 py-2 rounded-md font-semibold transition-colors ${
              activePlan === "yearly"
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-800"
            }`}
          >
            Yearly
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-white rounded-sm shadow-xl overflow-hidden ${
                animate ? `card-animate card-delay-${index}` : ""
              }`}
            >
              <div className="bg-[#1f1f1f] shadow-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
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
              <div className="bg-[#F0F0F0] shadow-xl p-6 flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">
                  {activePlan === "monthly"
                    ? plan.monthlyPrice
                    : plan.yearlyPrice}
                </span>
                <button
                  onClick={() => handleJoinNow(plan.name)}
                  className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
