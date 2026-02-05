"use client";

import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useInfiniteActivities from "../../_hooks/useInfiniteActivities";
import ActivityCard from "../common/ActivityCard";
import ActivityCardSkeletonList from "../common/ActivityCardSkeletonList";

import SwiperNextSvg from "@/assets/svg/SwiperNextSvg";
import SwiperPrevSvg from "@/assets/svg/SwiperPrevSvg";

const PopularActivitySection = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteActivities({
    sort: "most_reviewed",
    method: "cursor",
  });

  const handleReachEnd = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  const handleSwiperInit = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const activities =
    data?.pages.flatMap((page) => {
      return page.activities;
    }) ?? [];

  if (isLoading) {
    return (
      <section className="flex flex-col gap-4 md:gap-8">
        <h2 className="typo-18-b md:typo-32-b">🔥 인기 체험</h2>
        <div className="flex w-82 flex-nowrap gap-3 overflow-hidden md:w-171 md:gap-6 lg:w-280">
          <ActivityCardSkeletonList count={4} />
        </div>
      </section>
    );
  }

  return (
    <div className="flex w-81.75 flex-col gap-1 md:w-180 md:gap-4 lg:w-287 lg:gap-5">
      <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🔥 인기 체험</div>
      {/* mobile */}
      <div className="md:hidden">
        <div className="w-full min-w-0">
          <Swiper
            onReachEnd={handleReachEnd}
            slidesPerView="auto"
            spaceBetween={12}
            freeMode
            watchOverflow={false}
            observer
            observeParents
            className="w-full"
          >
            {activities.map((activity) => {
              return (
                <SwiperSlide key={activity.id} className="w-33! shrink-0! px-2 py-3">
                  <ActivityCard activity={activity} isSmall />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      {/* desktop & tablet */}
      <div className="relative hidden gap-3 md:block md:gap-5 lg:gap-6">
        <button
          className={`swiper-prev absolute top-1/2 left-3 z-20 -translate-x-1/2 -translate-y-1/2
            cursor-pointer rounded-[100px] border border-gray-300 bg-white px-4.75 py-5.25
            text-black shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] transition hover:bg-gray-50
            ${isBeginning ? "pointer-events-none opacity-0" : "opacity-100"} `}
        >
          <SwiperPrevSvg className="h-3 w-4" />
        </button>
        <Swiper
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          onReachEnd={handleReachEnd}
          navigation={{
            prevEl: ".swiper-prev",
            nextEl: ".swiper-next",
          }}
          modules={[Navigation]}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 2 },
          }}
        >
          {activities.map((activity) => {
            return (
              <SwiperSlide key={activity.id} className="px-3 py-6 md:gap-3">
                <ActivityCard key={activity.id} activity={activity} isSmall />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <button
          className={`swiper-next absolute top-1/2 right-2 z-20 translate-x-1/2 -translate-y-1/2
            cursor-pointer rounded-[100px] border border-gray-300 bg-white px-4.75 py-5.25
            text-black shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] transition hover:bg-gray-50
            ${isEnd ? "pointer-events-none opacity-0" : "opacity-100"} `}
        >
          <SwiperNextSvg className="h-3 w-4" />
        </button>
      </div>
    </div>
  );
};

export default PopularActivitySection;
