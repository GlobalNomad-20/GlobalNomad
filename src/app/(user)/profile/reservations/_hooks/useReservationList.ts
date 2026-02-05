"use client";

import { useCallback, useMemo, useState } from "react";

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

  const handleSelectStatus = useCallback((status?: ReservationStatus) => {
    setSelectedStatus(status);
  }, []);

  const handleReachEnd = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReservations = useMemo(() => {
    return (
      data?.pages.flatMap((page) => {
        return page.reservations;
      }) ?? []
    );
  }, [data]);

  const isInitialEmpty = !isLoading && !selectedStatus && allReservations.length === 0;
  const isFilterEmpty = !isLoading && !!selectedStatus && allReservations.length === 0;

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
