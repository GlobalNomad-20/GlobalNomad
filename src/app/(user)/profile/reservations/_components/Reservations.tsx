"use client";

import { useState } from "react";

import ReservationBadge from "./badge/ReservationBadge";
import ReservationCard from "./card/ReservationCard";
import ReservationEmpty from "./card/ReservationEmpty";
import ReservationSkeleton from "./card/ReservationSkeleton";

import useReservations from "@/hooks/queries/useReservations";
import { ReservationStatus } from "@/types/getReservationsParams";

const Reservations = () => {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | undefined>(undefined);
  const { data, isLoading, error } = useReservations({
    size: 10,
    status: selectedStatus,
  });

  const handleSelectStatus = (status?: ReservationStatus) => {
    setSelectedStatus(status);
  };

  const isInitialEmpty = !isLoading && !selectedStatus && data?.totalCount === 0;
  const isFilterEmpty = !isLoading && selectedStatus && data?.totalCount === 0;

  if (isInitialEmpty) return <ReservationEmpty />;

  return (
    <section>
      <ReservationBadge selectedStatus={selectedStatus} onStatusChange={handleSelectStatus} />

      {error && (
        <div className="py-20 text-center text-red-500">에러가 발생했습니다: {error.message}</div>
      )}

      <div className="mt-5 mb-10 space-y-7.5">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => {
            return <ReservationSkeleton key={i} />;
          })
        ) : isFilterEmpty ? (
          <div className="py-20 text-center text-gray-500">해당 상태의 예약 내역이 없습니다.</div>
        ) : (
          data?.reservations.map((reservation) => {
            return <ReservationCard key={reservation.id} reservation={reservation} />;
          })
        )}
      </div>
    </section>
  );
};

export default Reservations;
