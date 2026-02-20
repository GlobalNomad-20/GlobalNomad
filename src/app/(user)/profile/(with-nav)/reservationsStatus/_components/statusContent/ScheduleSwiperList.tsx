"use client";

import "swiper/css";
import { FreeMode, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ReservationCard from "./ReservationCard";

import { useInfiniteActivityReservations } from "@/hooks/queries/useMyActivities";
import { ReservationStatus } from "@/types/reservations";

interface ScheduleListProps {
  activityId: number;
  scheduleId: number;
  status: TabStatus;
}

type TabStatus = Extract<ReservationStatus, "pending" | "confirmed" | "declined">;

// eslint-disable-next-line @typescript-eslint/naming-convention
const STATUS_LABEL_MAP: Record<TabStatus, string> = {
  pending: "예약",
  confirmed: "승인",
  declined: "거절",
};
const ScheduleSwiperList = ({ activityId, scheduleId, status }: ScheduleListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteActivityReservations({
    activityId,
    scheduleId,
    status,
    size: 10,
  });

  const reservations =
    data?.pages.flatMap((page) => {
      return page.reservations;
    }) || [];

  if (reservations.length === 0) {
    return (
      <div
        className="mt-4 rounded-lg border border-gray-200 bg-white p-6 text-center text-sm
          text-gray-500 shadow-sm"
      >
        {STATUS_LABEL_MAP[status]} 내역이 없습니다.
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView="auto"
      spaceBetween={14}
      // eslint-disable-next-line react/jsx-handler-names
      onReachEnd={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      direction="vertical"
      freeMode={true}
      mousewheel={true}
      observer={true}
      observeParents={true}
      modules={[FreeMode, Mousewheel]}
      className="max-h-46 w-full md:max-h-64 lg:max-h-50.5"
    >
      <SwiperSlide>
        <div />
      </SwiperSlide>
      {reservations.map((reservation) => {
        return (
          <SwiperSlide key={reservation.id}>
            <ReservationCard reservation={reservation} status={status} />
          </SwiperSlide>
        );
      })}
      {isFetchingNextPage && (
        <SwiperSlide>
          <div className="typo-14-m p-4 text-center text-gray-500">로딩 중...</div>
        </SwiperSlide>
      )}
    </Swiper>
  );
};

export default ScheduleSwiperList;
