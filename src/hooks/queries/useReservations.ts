"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { createReservationReview, deleteReservation, getReservations } from "@/api/reservations";
import {
  GetReservationsParams,
  ReservationsResponse,
  ReservationReviewRequest,
  ReservationStatus,
} from "@/types/reservations";

export const useGetReservations = (params: GetReservationsParams) => {
  const { size, status } = params;
  return useInfiniteQuery<ReservationsResponse>({
    queryKey: ["reservations", size, status],
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
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      console.log("예약이 취소되었습니다.");
    },
    onError: (error) => {
      console.error("상태 업데이트 실패:", error);
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
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      console.log("리뷰가 등록되었습니다.");
    },
    onError: (error) => {
      console.error("리뷰 등록 실패:", error);
    },
  });
};
