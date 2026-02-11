"use client";

import { useCallback } from "react";

import { useGetMyActivities } from "@/hooks/queries/useMyActivities";

const pageSize = 10;

// 내 체험 내역 무한 스크롤 리스트 조회 훅
const useMyActivityList = () => {
  const { data, isLoading, ...queryHelpers } = useGetMyActivities({
    size: pageSize,
  });

  const hasReservations =
    data?.pages?.some((page) => {
      return page.activities.length > 0;
    }) ?? false;

  const isInitialEmpty = !isLoading && !hasReservations;

  const handleReachEnd = useCallback(() => {
    if (queryHelpers.hasNextPage && !queryHelpers.isFetchingNextPage) {
      queryHelpers.fetchNextPage();
    }
  }, [queryHelpers]);

  return {
    handleReachEnd,
    isInitialEmpty,
    isLoading,
    ...queryHelpers,
    pages: data?.pages ?? [],
  };
};

export default useMyActivityList;
