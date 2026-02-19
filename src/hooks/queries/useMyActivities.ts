"use client";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyActivitiesQueryOptions } from "./options/myActivitiesOptions";

import {
  fetchActivityReservations,
  fetchReservationDashboard,
  fetchReservedSchedule,
  patchReservationStatus,
} from "@/api/myActivities";
import { myActivitiesKeys } from "@/lib/query/queryKeys";
import { ReservationDashboardResponse, ReservedScheduleResponse } from "@/types/activity";
import {
  ActivityReservationsResponse,
  FetchReservationsParams,
  GetMyActivitiesParams,
} from "@/types/myActivities";
import { UpdateReservationStatusParams } from "@/types/reservations";

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

export const useReservedSchedule = (activityId: number, date: string) => {
  return useQuery<ReservedScheduleResponse>({
    queryKey: myActivitiesKeys.reservedSchedule(activityId, date),
    queryFn: () => {
      return fetchReservedSchedule(activityId, date);
    },
    enabled: !!activityId && !!date,
  });
};

export const useInfiniteActivityReservations = ({
  activityId,
  scheduleId,
  status,
  size = 10,
  cursorId,
}: FetchReservationsParams) => {
  return useInfiniteQuery<ActivityReservationsResponse>({
    queryKey: myActivitiesKeys.reservations(activityId, scheduleId, status, size, cursorId),
    initialPageParam: null,
    queryFn: ({ pageParam }) => {
      return fetchActivityReservations({
        activityId,
        scheduleId,
        status,
        size,
        cursorId: pageParam as number | undefined,
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

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, reservationId, status }: UpdateReservationStatusParams) => {
      return patchReservationStatus({ activityId, reservationId, status });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: myActivitiesKeys.reservations(variables.activityId),
      });
      queryClient.invalidateQueries({
        queryKey: myActivitiesKeys.reservedSchedule(variables.activityId),
      });
    },
    onError: (error) => {
      console.error("예약 상태 변경 실패:", error);
    },
  });
};
