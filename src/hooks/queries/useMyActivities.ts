"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { myActivitiesKeys } from "@/lib/query/queryKeys";
import { GetMyActivitiesParams, MyActivitiesResponse } from "@/types/myActivities";
import { getMyActivities } from "@/api/myActivities";

export const useGetMyActivities = (params: GetMyActivitiesParams) => {
  const { size } = params;

  return useInfiniteQuery<MyActivitiesResponse>({
    queryKey: myActivitiesKeys.list(),
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      return getMyActivities({
        cursorId: pageParam as number | undefined,
        size,
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
