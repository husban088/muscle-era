"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function Trainers() {
  const trainers = [
    {
      id: 1,
      name: "John Smith",
      work: "Body Builder",
      clients: 20,
      image: "/images/trainer01.png",
      rating: 5,
    },
    {
      id: 2,
      name: "Leo Hunter",
      work: "Boxer",
      clients: 15,
      image: "/images/trainer1.png",
      rating: 4,
    },
    {
      id: 3,
      name: "Maya Steel",
      work: "Body Builder",
      clients: 25,
      image: "/images/trainer2.png",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah Davis",
      work: "Yoga Instructor",
      clients: 18,
      image: "/images/trainer3.png",
      rating: 4,
    },
    {
      id: 5,
      name: "Chris Brown",
      work: "Boxer",
      clients: 22,
      image: "/images/trainer4.png",
      rating: 5,
    },
    {
      id: 6,
      name: "Jordan Wolf",
      work: "Fitness Coach",
      clients: 17,
      image: "/images/trainer5.png",
      rating: 4,
    },
  ];

  return (
    <section className="py-16 bg-[#eee] text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Meet Trainers</h2>
        <p className="text-center text-black mb-12">
          Meet our expert personal trainers. No matter what your goal is, they
          will help you to reach it.
        </p>
        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            className="trainer-swiper"
          >
            {trainers.map((trainer) => (
              <SwiperSlide key={trainer.id}>
                <div className="trainer-card w-[320px] mx-auto pt-[6rem]">
                  <div className="relative h-[400px] flex justify-center">
                    <div className="absolute top-12 w-64 h-64 bg-[#028b8f] rounded-[20px] transform rotate-45 z-0"></div>
                    <Image
                      src={trainer.image}
                      alt={trainer.name}
                      width={280}
                      height={360}
                      className="object-contain relative z-10 -top-8 w-full h-full"
                    />
                  </div>
                  <div className="bg-[#000] rounded-b-lg pt-12 pb-6 px-4 text-center -mt-16">
                    <div className="flex justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-5 w-5 ${
                            i < trainer.rating
                              ? "text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="text-xl text-white font-semibold">
                      {trainer.name}
                    </h4>
                    <p className="text-white text-sm mb-2">{trainer.work}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-left">
                        <p className="text-sm text-white">Clients</p>
                        <p className="text-lg font-bold text-white">
                          {trainer.clients}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <a href="#" aria-label="Facebook">
                          <FaFacebook className="h-5 w-5 text-white hover:text-custom-teal" />
                        </a>
                        <a href="#" aria-label="Instagram">
                          <FaInstagram className="h-5 w-5 text-white hover:text-custom-teal" />
                        </a>
                        <a href="#" aria-label="TikTok">
                          <FaTiktok className="h-5 w-5 text-white hover:text-custom-teal" />
                        </a>
                        <a href="#" aria-label="YouTube">
                          <FaYoutube className="h-5 w-5 text-white hover:text-custom-teal" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-0 right-0 flex gap-2 z-10">
            <button className="swiper-button-prev-custom bg-custom-teal p-2 rounded-full">
              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </button>
            <button className="swiper-button-next-custom bg-custom-teal p-2 rounded-full">
              <ArrowRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
