"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Slideshow({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      {children}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="mySwiper"
      >
        {[1, 2, 3].map((i) => (
          <SwiperSlide key={i}>
            <div className="relative h-96">
              <Image
                src={`/${i}.jpg`}
                width={500}
                height={500}
                alt="Slideshow Image"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
