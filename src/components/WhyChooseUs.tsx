"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  const [trainerCount, setTrainerCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      const trainerInterval = setInterval(() => {
        setTrainerCount((prev) => {
          if (prev >= 2) {
            clearInterval(trainerInterval);
            return 2;
          }
          return prev + 1;
        });
      }, 500);

      const studentInterval = setInterval(() => {
        setStudentCount((prev) => {
          if (prev >= 1000) {
            clearInterval(studentInterval);
            return 1000;
          }
          return prev + 50;
        });
      }, 50);

      return () => {
        clearInterval(trainerInterval);
        clearInterval(studentInterval);
      };
    }
  }, [inView]);

  return (
    <section className="bg-[#eee] py-16 mt-0 font-zen-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
          Why Choose Us
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 relative">
            <div
              className="absolute inset-0 bg-gray-200 rounded-full z-0 flex items-center justify-center bg-no-repeat bg-center"
              style={{
                backgroundImage: "url('/images/shape-95.png')",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
              }}
            ></div>
            <Image
              src="/images/cta-box-image.png"
              alt="Why Choose Us"
              width={550}
              height={400}
              className="w-full max-w-[550px] h-auto object-cover rounded-lg relative z-10 shadow-3xl"
            />
            <Image
              src="/images/award.png"
              alt="Batch Image"
              width={112}
              height={112}
              className="absolute top-[-20px] right-[-5px] w-24 h-24 sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain rounded-full z-20"
            />
          </div>
          <div className="md:w-1/2 bg-contain bg-center bg-no-repeat">
            <div className="bg-transparent bg-opacity-80 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold text-black mb-4">
                Why Choose Us to Join Our Classes
              </h3>
              <p className="text-black mb-6">
                Gymat an unknown printer took galle type anscraey aretea bled
                make a type specimen bookayurvived not onlyive centuries. Gymat
                an unknown printer took galle type anscraey.
              </p>
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <Image
                    src="/images/liftingmachine.png"
                    alt="Modern Equipment"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-black">
                    Modern Equipment
                  </h4>
                  <p className="text-black">
                    Gymat an unknown printer took a galley of type and scraey.
                  </p>
                </div>
                <div className="flex-1">
                  <Image
                    src="/images/Group-47-1.png"
                    alt="Weight Balance"
                    width={48}
                    height={48}
                    className="w-12 h-12 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold text-black">
                    Weight Balance
                  </h4>
                  <p className="text-black">
                    Gymat an unknown printer took a galley of type and scraey.
                  </p>
                </div>
              </div>
              <div ref={ref} className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 border-2 border-[#028b8f] rounded-lg p-4 text-center">
                  <motion.h5
                    className="text-3xl font-bold text-custom-teal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {trainerCount}+
                  </motion.h5>
                  <p className="text-black">Expert Trainer</p>
                </div>
                <div className="flex-1 border-2 border-[#028b8f] rounded-lg p-4 text-center">
                  <motion.h5
                    className="text-3xl font-bold text-custom-teal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {studentCount}+
                  </motion.h5>
                  <p className="text-black">Trained Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
