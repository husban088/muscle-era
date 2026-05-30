import Image from "next/image";
import FitnessClasses from "@/components/FitnessClasses";
import WeeklyTimeTable from "@/components/WeeklyTimeTable";

export default function ClassesPage() {
  return (
    <div className="m-0 p-0 font-zen-dots bg-black animate-slideDown">
      {/* Background image — absolute, only covers viewport height */}
      <div className="absolute inset-x-0 top-0 z-0 h-screen">
        <Image
          src="/images/allban.png"
          alt="Classes Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Banner text — sits in viewport center, z above bg */}
      <div className="relative z-10 flex items-center justify-center h-screen">
        <div className="banner-button">Fitness Classes</div>
      </div>

      {/* Main content — scrolls naturally, solid black bg so it covers the image */}
      <div className="relative z-10 bg-black">
        <FitnessClasses />
        <WeeklyTimeTable />
      </div>
    </div>
  );
}
