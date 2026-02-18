"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { activityIdKeys, myActivitiesKeys } from "@/lib/query/queryKeys";
import {
  GetMyActivitiesParams,
  MyActivitiesResponse,
  MyActivityDetailResponse,
} from "@/types/myActivities";
import { getMyActivities, getMyDetailActivity } from "@/api/myActivities";

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

export const useGetMyDetailActivity = (activityId?: number) => {
  return useQuery<MyActivityDetailResponse>({
    queryKey: activityIdKeys.detail(activityId!),
    queryFn: () => {
      return getMyDetailActivity(activityId!);
    },
    enabled: !!activityId,
  });
};
