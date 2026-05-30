import Image from "next/image";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function AboutPage() {
  return (
    <div className="m-0 p-0 font-zen-dots relative">
      <div className="fixed inset-0 z-[-10]">
        <Image
          src="/images/allban.png"
          alt="About Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="banner-button">About us</div>
        </div>
      </div>
      <div className="pt-[26rem] sm:pt-[35rem]">
        <WhyChooseUs />
      </div>
    </div>
  );
}
