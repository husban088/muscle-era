"use client";

import { useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";

export default function FitnessClasses() {
  const [activeClass, setActiveClass] = useState("Fitness & Gym Class");

  const classes = [
    {
      name: "Fitness & Gym Class",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/fitnessclass.webp",
      dumbbellImage: "/images/serviceo.svg",
      description:
        "Treadmills, stationary bikes, and elliptical machines are commonly used for cardiovascular workouts, helping to improve endurance, burn calories, and enhance heart health.",
      trainer: {
        name: "John Doe",
        image: "/images/harry.webp",
        phone: "+923360763840",
      },
    },
    {
      name: "Personal Training",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/trainingclass.webp",
      dumbbellImage: "/images/service_icon1-2.svg",
      description:
        "Yoga and meditation classes focus on flexibility, balance, and mental well-being, combining poses, breathing exercises, and mindfulness techniques.",
      trainer: {
        name: "Jane Smith",
        image: "/images/natasha.webp",
        phone: "+923360763841",
      },
    },
    {
      name: "Boxing Class",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/boxingclass.webp",
      dumbbellImage: "/images/service_icon1-3.svg",
      description:
        "Strength training sessions utilize weights and resistance exercises to build muscle, increase strength, and improve overall fitness.",
      trainer: {
        name: "Mike Johnson",
        image: "/images/esa.webp",
        phone: "+923360763842",
      },
    },
    {
      name: "CrossFit Training",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/crossfitclass.webp",
      dumbbellImage: "/images/service_icon1-4.svg",
      description:
        "High-Intensity Interval Training (HIIT) involves short bursts of intense exercise followed by rest, maximizing calorie burn and fitness gains.",
      trainer: {
        name: "Emily Davis",
        image: "/images/harry.webp",
        phone: "+923360763843",
      },
    },
    {
      name: "Yoga & Pilates",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/yogaclass.webp",
      dumbbellImage: "/images/service_icon1-5.svg",
      description:
        "Pilates classes emphasize core strength, flexibility, and controlled movements to enhance posture and body alignment.",
      trainer: {
        name: "Sarah Wilson",
        image: "/images/natasha.webp",
        phone: "+923360763844",
      },
    },
    {
      name: "Psycho Training",
      bgImage: "/images/shape-95.png",
      trainingImage: "/images/psycoclass.webp",
      dumbbellImage: "/images/service_icon1-6.svg",
      description:
        "Spin cycling classes offer high-energy cardio workouts on stationary bikes, improving endurance and cardiovascular health.",
      trainer: {
        name: "David Brown",
        image: "/images/esa.webp",
        phone: "+923360763845",
      },
    },
  ];

  return (
    <section className="bg-[#000000] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Our Gym Fitness Classes
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Buttons */}
          <div className="lg:w-1/4 flex flex-col gap-4">
            {classes.map((classItem) => (
              <div key={classItem.name} className="relative flex items-center">
                <button
                  onClick={() => setActiveClass(classItem.name)}
                  className={`w-full text-left py-6 px-4 rounded-md font-semibold transition-colors ${
                    activeClass === classItem.name
                      ? "bg-custom-teal text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {classItem.name}
                </button>
                <div
                  className={`absolute right-0 top-1/2 h-px w-8 lg:w-16 bg-custom-teal transform -translate-y-1/2 ${
                    activeClass === classItem.name ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
            ))}
          </div>
          {/* Right Side: Active Class Content */}
          <div className="lg:w-3/4">
            {classes.map(
              (classItem) =>
                activeClass === classItem.name && (
                  <div
                    key={classItem.name}
                    className="bg-[#1f1f1f] p-6 rounded-lg relative"
                    style={{
                      backgroundImage: `url(${classItem.bgImage})`,
                      backgroundPosition: "top right",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "200px",
                    }}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Left: Training Image */}
                      <div className="md:w-1/2">
                        <img
                          src={classItem.trainingImage}
                          alt={classItem.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      {/* Right: Content */}
                      <div className="md:w-1/2 flex flex-col gap-4">
                        <img
                          src={classItem.dumbbellImage}
                          alt="Dumbbell"
                          className="w-12 h-12 object-contain"
                        />
                        <h3 className="text-2xl font-semibold text-white">
                          {classItem.name}
                        </h3>
                        <p className="text-gray-300">{classItem.description}</p>
                        <div className="flex flex-col gap-6 mt-4">
                          <div className="flex-1 flex items-center gap-4">
                            <img
                              src={classItem.trainer.image}
                              alt={classItem.trainer.name}
                              className="w-14 h-14 object-cover rounded-full border-2 border-[#d7a95f] shadow-3xl"
                            />
                            <div>
                              <p className="text-white text-sm">
                                {classItem.trainer.name}
                              </p>
                              <p className="text-gray-400">Gym Trainer</p>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">Call Me</p>
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="h-5 w-5 text-custom-teal" />
                              <span className="text-gray-300">
                                {classItem.trainer.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
