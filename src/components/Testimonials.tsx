"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";

// Define the testimonial data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    className: "Bodybuilding",
    rating: 5,
    review:
      "Amazing gym! The trainers are professional, and the environment is motivating. I've seen great results in just a few months!",
    image: "/images/trainer01.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    className: "Boxing",
    rating: 4,
    review:
      "The boxing classes are fantastic! The coaches push you to your limits, and the community is so supportive.",
    image: "/images/trainer1.png",
  },
  {
    id: 3,
    name: "Mike Johnson",
    className: "Bodybuilding",
    rating: 5,
    review:
      "Best gym I've ever joined. The equipment is top-notch, and the staff is always ready to help.",
    image: "/images/trainer2.png",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleImageClick = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
      setActiveIndex(index);
    }
  };

  return (
    <section className="relative bg-black text-white py-16 font-zen-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-custom-teal mb-12 animate-slideUp">
          Client Reviews
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Swiper Slider */}
          <div className="lg:w-1/2">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              onSlideChange={handleSlideChange}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg animate-testimonial-slide">
                    {/* Client Image */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-36 lg:h-36 mb-4 border-2 border-white rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="rounded-full object-cover"
                        sizes="(max-width: 768px) 112px, 144px"
                      />
                    </div>
                    {/* Client Name */}
                    <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-1">
                      {testimonial.name}
                    </h4>
                    {/* Class Name */}
                    <p className="text-sm sm:text-base lg:text-lg text-custom-teal mb-2">
                      {testimonial.className}
                    </p>
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {/* Review Text */}
                    <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-md">
                      {testimonial.review}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Custom Pagination (Dashes) */}
            <div className="custom-pagination flex justify-center gap-2 mt-6"></div>
          </div>
          {/* Right Side: Background Image with Client Images */}
          <div className="lg:w-1/2 relative hidden lg:block">
            <div className="relative w-full h-[500px]">
              <Image
                src="/images/vector-2-1.png"
                alt="Testimonial Background"
                fill
                className="object-cover rounded-lg"
                sizes="100vw"
              />
              {/* Client Images Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Small Images Around */}
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`absolute w-16 h-16 rounded-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-110 ${
                      index === 0
                        ? "top-10 left-10"
                        : index === 1
                        ? "bottom-10 left-20"
                        : "top-20 right-10"
                    } ${
                      activeIndex === index ? "border-2 border-custom-teal" : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
                {/* Center Large Image (Dynamic based on active slide) */}
                <div className="absolute w-32 h-32 rounded-full overflow-hidden border-4 border-custom-teal animate-image-switch">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 20px;
          height: 2px;
          background-color: #fff;
          opacity: 0.3;
          border-radius: 0;
          cursor: pointer;
          transition: opacity 0.3s ease-in-out;
        }
        .custom-bullet-active {
          opacity: 1;
          background-color: #028b8f;
        }
        @keyframes testimonial-slide {
          0% {
            transform: translateX(50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-testimonial-slide {
          animation: testimonial-slide 0.5s ease-out forwards;
        }
        @keyframes image-switch {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-image-switch {
          animation: image-switch 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
