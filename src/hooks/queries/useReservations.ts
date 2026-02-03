"use client";

import { useQuery } from "@tanstack/react-query";

import getReservations from "@/api/reservations";
import { GetMyReservationsParams } from "@/types/getReservationsParams";
import { ReservationsResponse } from "@/types/reservations";

const useReservations = (params: GetMyReservationsParams) => {
  const { cursorId, size, status } = params;

  return useQuery<ReservationsResponse>({
    queryKey: ["reservations", cursorId, size, status],
    queryFn: () => {
      return getReservations({
        cursorId,
        size,
        status,
      });
    },
  });
};

export default useReservations;
