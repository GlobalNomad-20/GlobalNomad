"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createReservationReview, deleteReservation, getReservations } from "@/api/reservations";
import {
  GetReservationsParams,
  ReservationsResponse,
  ReservationReviewRequest,
  ReservationStatus,
} from "@/types/reservations";
import { myReservationsKeys } from "@/lib/query/queryKeys";

export const useGetReservations = (params: GetReservationsParams) => {
  const { size, status } = params;

  return useInfiniteQuery<ReservationsResponse>({
    queryKey: myReservationsKeys.list(status),
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      return getReservations({
        cursorId: pageParam as number | undefined,
        size,
        status,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.cursorId) {
        return lastPage.cursorId;
      }
      return null;
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      status,
    }: {
      reservationId: number;
      status: ReservationStatus;
    }) => {
      return deleteReservation(reservationId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myReservationsKeys.all });
    },
    onError: (error) => {
      console.error("예약 취소 실패:", error);
    },
  });
};

export const useCreateReservationReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      reviewData,
    }: {
      reservationId: number;
      reviewData: ReservationReviewRequest;
    }) => {
      return createReservationReview(reservationId, reviewData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myReservationsKeys.all });
    },
    onError: (error) => {
      console.error("리뷰 등록 실패:", error);
    },
  });
};
