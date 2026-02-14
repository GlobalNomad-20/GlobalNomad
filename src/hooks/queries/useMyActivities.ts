"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getMyActivitiesQueryOptions } from "./options/myActivitiesOptions";

import { fetchReservationDashboard } from "@/api/myActivities";
import { myActivitiesKeys } from "@/lib/query/queryKeys";
import { ReservationDashboardResponse } from "@/types/activity";
import { GetMyActivitiesParams } from "@/types/myActivities";

export const useGetMyActivities = (params: GetMyActivitiesParams) => {
  return useInfiniteQuery(getMyActivitiesQueryOptions(params.size as number));
};

export const useReservationDashboard = (activityId: number, year: string, month: string) => {
  return useQuery<ReservationDashboardResponse>({
    queryKey: myActivitiesKeys.dashboard(activityId, year, month),
    queryFn: () => {
      return fetchReservationDashboard(activityId, year, month);
    },
    enabled: !!activityId && !!year && !!month,
  });
};
