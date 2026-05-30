import Image from "next/image";
import Trainers from "@/components/Trainers";

export default function TrainersPage() {
  return (
    <div className="m-0 p-0 font-zen-dots relative">
      <div className="fixed inset-0 z-[-10]">
        <Image
          src="/images/allban.png"
          alt="Trainers Banner"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="banner-button">Meet Trainers</div>
        </div>
      </div>
      <div className="pt-[26rem] sm:pt-[35rem]">
        <Trainers />
      </div>
    </div>
  );
}
