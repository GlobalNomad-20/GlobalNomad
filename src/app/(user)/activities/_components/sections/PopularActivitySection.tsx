"use client";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useInfiniteActivities from "../../_hooks/useInfiniteActivities";
import ActivityCard from "../common/ActivityCard";
import ActivityCardSkeletonList from "../common/ActivityCardSkeletonList";

const PopularActivitySection = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteActivities({
    sort: "most_reviewed",
    method: "cursor",
  });

  const handleReachEnd = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
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
    <div className="flex w-81.75 flex-col gap-3.5 md:w-171 md:gap-4 lg:w-280 lg:gap-5">
      <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🔥 인기 체험</div>
      <div className="flex gap-3 md:gap-5 lg:gap-6">
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          onReachEnd={handleReachEnd}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {activities.map((activity) => {
            return (
              <SwiperSlide key={activity.id} className="py-3 md:gap-3">
                <ActivityCard key={activity.id} activity={activity} isSmall />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default PopularActivitySection;
