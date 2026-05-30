import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Services from "@/components/Services";
import Trainers from "@/components/Trainers";
import FitnessClasses from "@/components/FitnessClasses";
import WeeklyTimeTable from "@/components/WeeklyTimeTable";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <Hero />
      <WhyChooseUs />
      <Services />
      <Trainers />
      <FitnessClasses />
      <WeeklyTimeTable />
      <Testimonials />
      <Pricing />
    </div>
  );
}
