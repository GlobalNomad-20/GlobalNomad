import { InfiniteData } from "@tanstack/react-query";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Activity } from "@/types/activityCardList";
import { MyActivitiesResponse } from "@/types/myActivities";

interface ReservationsListProps {
  data: InfiniteData<MyActivitiesResponse, unknown> | undefined;
  isNext: boolean;
  onReachEnd: () => void;
  onClose: () => void;
  onClick: (activity: Activity) => void;
}

const ReservationsList = ({
  data,
  isNext,
  onReachEnd: handleReachEnd,
  onClose: handleClose,
  onClick: handleClick,
}: ReservationsListProps) => {
  return (
    <Swiper
      onReachEnd={handleReachEnd}
      direction="vertical"
      slidesPerView="auto"
      freeMode={true}
      mousewheel={true}
      observer={true}
      observeParents={true}
      modules={[FreeMode, Mousewheel]}
      className="max-h-64 w-full"
    >
      {data?.pages.map((page) => {
        return page.activities.map((activitie) => {
          return (
            <SwiperSlide
              key={activitie.id}
              // eslint-disable-next-line react/jsx-handler-names
              onClick={() => {
                handleClose();
                handleClick(activitie);
              }}
              className="h-auto! py-3 pl-1 hover:cursor-pointer hover:bg-gray-50"
            >
              <button className="typo-14-m md:typo-16-m">{activitie.title}</button>
            </SwiperSlide>
          );
        });
      })}
      {isNext && (
        <SwiperSlide className="h-auto!">
          <div className="flex items-center justify-center py-4">
            <div
              className="border-t-primary-500 h-5 w-5 animate-spin rounded-full border-2
                border-gray-300"
            />
          </div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ReservationsList;
