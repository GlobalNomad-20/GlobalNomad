"use client";

import { motion } from "framer-motion";

import useReservationsList from "../_hooks/useReservationList";

import ReservationBadge from "./badge/ReservationBadge";
import ReservationCard from "./card/ReservationCard";
import ReservationEmpty from "./card/ReservationEmpty";
import ReservationSkeleton from "./card/ReservationSkeleton";

import { cn } from "@/utils/cn";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ReservationList = () => {
  const {
    selectedStatus,
    handleSelectStatus,
    handleReachEnd,
    isInitialEmpty,
    isFilterEmpty,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    pages,
  } = useReservationsList();

  const { targetRef } = useIntersectionObserver({
    onIntersect: handleReachEnd,
    enabled: !!hasNextPage && !isFetchingNextPage,
  });

  if (isInitialEmpty) return <ReservationEmpty />;

  return (
    <section className="flex flex-col">
      <ReservationBadge selectedStatus={selectedStatus} onStatusChange={handleSelectStatus} />

      {error && (
        <div className="py-20 text-center text-red-500">에러가 발생했습니다: {error.message}</div>
      )}

      {isLoading ? (
        <div className="mb-10 space-y-6 lg:space-y-7.5">
          {Array.from({ length: 3 }).map((_, i) => {
            return <ReservationSkeleton key={i} />;
          })}
        </div>
      ) : isFilterEmpty ? (
        <div className="py-20 text-center text-gray-500">해당 상태의 예약 내역이 없습니다.</div>
      ) : (
        <motion.div
          key={selectedStatus}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className={cn("flex w-full flex-col gap-6 lg:gap-7.5", { "mb-45": isFetchingNextPage })}
          >
            {pages.map((page) => {
              return page.reservations.map((reservation) => {
                return <ReservationCard key={reservation.id} reservation={reservation} />;
              });
            })}

            <div ref={targetRef} className="h-10 w-full">
              {isFetchingNextPage && <ReservationSkeleton />}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default ReservationList;
