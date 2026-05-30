import Image from "next/image";
import Pricing from "@/components/Pricing";

export default function PricingPage() {
  return (
    <div className="m-0 p-0 font-zen-dots relative">
      <div className="fixed inset-0 z-[-10]">
        <Image
          src="/images/allban.png"
          alt="Pricing Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="banner-button">Pricing Plan</div>
        </div>
      </div>
      <div className="pt-[26rem] sm:pt-[35rem]">
        <Pricing />
      </div>
    </div>
  );
}
