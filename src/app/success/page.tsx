import Link from "next/link";

export default function Success() {
  return (
    <section className="bg-[#171717] py-16 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-sm shadow-xl p-6 text-center max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-800 mb-4">
          Thank you for your purchase. You will receive a confirmation email
          soon.
        </p>
        <Link
          href="/"
          className="bg-teal-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
