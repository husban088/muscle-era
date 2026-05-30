"use client";

import { useState } from "react";
import Image from "next/image";

export default function Services() {
  const [activeService, setActiveService] = useState(1);

  const services = [
    {
      id: 1,
      title: "Body Building",
      day: "Monday",
      time: "12:00 PM - 02:00 PM",
      image: "/images/fitnessclass.webp",
    },
    {
      id: 2,
      title: "Weight Lifting",
      day: "Tuesday",
      time: "12:00 PM - 02:00 PM",
      image: "/images/trainingclass.webp",
    },
    {
      id: 3,
      title: "Musculation",
      day: "Wednesday",
      time: "12:00 PM - 02:00 PM",
      image: "/images/boxingclass.webp",
    },
    {
      id: 4,
      title: "Classic Yoga",
      day: "Thursday",
      time: "12:00 PM - 02:00 PM",
      image: "/images/crossfitclass.webp",
    },
    {
      id: 5,
      title: "Cardio",
      day: "Friday",
      time: "12:00 PM - 02:00 PM",
      image: "/images/yogaclass.webp",
    },
  ];

  return (
    <section className="py-16 bg-[#141414] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">
              Great Way To Start Today
            </h3>
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-item flex items-center gap-4 py-8 border-b border-gray-700 group ${
                  activeService === service.id ? "active" : ""
                }`}
                onMouseEnter={() => setActiveService(service.id)}
              >
                <div className="service-border w-1 h-12 bg-gray-300 group-hover:bg-custom-teal transition-colors duration-300" />
                <span className="service-count text-2xl font-bold group-hover:text-custom-teal transition-colors duration-300">
                  {service.id.toString().padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <p className="text-sm uppercase text-gray-400 mb-1">
                    {service.day}: {service.time}
                  </p>
                  <h4 className="text-xl font-semibold group-hover:text-custom-teal transition-colors duration-300">
                    {service.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/2 relative h-screen w-[100%]">
            {services.map((service) => (
              <div
                key={service.id}
                className={`service-image absolute inset-0 transition-opacity duration-500 ${
                  activeService === service.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-lg h-ful border-2 border-[#028b8f]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-custom-teal text-white p-4 text-center transform translate-y-0 transition-transform duration-500">
                  <h4 className="text-xl font-semibold">{service.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
