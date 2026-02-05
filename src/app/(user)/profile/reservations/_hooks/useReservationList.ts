"use client";

import { useCallback, useState } from "react";

import { useGetReservations } from "@/hooks/queries/useReservations";
import { ReservationStatus } from "@/types/reservations";

const pageSize = 5;

// 예약 내역 리스트 조회, 필터 상태 관리 훅
const useReservationsList = () => {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | undefined>(undefined);

  const { data, isLoading, error, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetReservations({
      size: pageSize,
      status: selectedStatus,
    });

  const handleSelectStatus = (status?: ReservationStatus) => {
    setSelectedStatus(status);
  };

  const handleReachEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const hasReservations =
    data?.pages?.some((page) => {
      return page.reservations.length > 0;
    }) ?? false;

  const isInitialEmpty = !isLoading && !selectedStatus && !hasReservations;
  const isFilterEmpty = !isLoading && !!selectedStatus && !hasReservations;

  const normalizedError = error instanceof Error ? error : null;

  return {
    selectedStatus,
    handleSelectStatus,
    handleReachEnd,
    isInitialEmpty,
    isFilterEmpty,
    isLoading,
    error: normalizedError,
    isFetchingNextPage,
    hasNextPage,
    pages: data?.pages ?? [],
  };
};

export default useReservationsList;
