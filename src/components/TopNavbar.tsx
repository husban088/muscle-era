"use client";

import { useState, useEffect } from "react";
import { MapPinIcon, ClockIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function TopNavbar() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hidden lg:block fixed top-0 left-0 w-full bg-transparent text-white z-50 border-b border-gray-600 transition-opacity duration-300 ${
        isTop ? "topnavbar-visible" : "topnavbar-hidden"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[1rem] flex justify-between items-center text-md">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5" />
          <span>Sydney, Australia</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5" />
          <span>Monday to Friday: 5:00 AM - 10:00 PM</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-5 w-5" />
          <span>+61398765432</span>
        </div>
      </div>
    </div>
  );
}
