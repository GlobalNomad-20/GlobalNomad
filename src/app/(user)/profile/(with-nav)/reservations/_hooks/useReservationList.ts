"use client";

import { useCallback } from "react";

import useReservationFilter from "./useReservationFilter";

import { useGetReservations } from "@/hooks/queries/useReservations";

const pageSize = 10;

// 예약 내역 무한 스크롤 리스트 조회 훅
const useReservationList = () => {
  const { selectedStatus, setSelectedStatus, getEmptyState } = useReservationFilter();

  const { data, isLoading, ...queryHelpers } = useGetReservations({
    size: pageSize,
    status: selectedStatus,
  });

  const hasReservations =
    data?.pages?.some((page) => {
      return page.reservations.length > 0;
    }) ?? false;

  const { isInitialEmpty, isFilterEmpty } = getEmptyState(isLoading, hasReservations);

  const handleReachEnd = useCallback(() => {
    if (queryHelpers.hasNextPage && !queryHelpers.isFetchingNextPage) {
      queryHelpers.fetchNextPage();
    }
  }, [queryHelpers]);

  return {
    selectedStatus,
    handleSelectStatus: setSelectedStatus,
    handleReachEnd,
    isInitialEmpty,
    isFilterEmpty,
    isLoading,
    ...queryHelpers,
    pages: data?.pages ?? [],
  };
};

export default useReservationList;
