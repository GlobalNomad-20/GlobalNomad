"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyActivitiesQueryOptions } from "./options/myActivitiesOptions";

import {
  createActivity,
  deleteActivity,
  fetchActivityReservations,
  fetchReservationDashboard,
  fetchReservedSchedule,
  patchReservationStatus,
  updateActivity,
  uploadActivityImage,
} from "@/api/myActivities";
import { activityIdKeys, myActivitiesKeys } from "@/lib/query/queryKeys";
import { ReservationDashboardResponse, ReservedScheduleResponse } from "@/types/activity";
import {
  ActivityReservationsResponse,
  CreateActivityRequest,
  FetchReservationsParams,
  GetMyActivitiesParams,
  UpdateActivityRequest,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...myActivitiesKeys.all],
      });
    },
    onError: (error) => {
      console.error("예약 상태 변경 실패:", error);
    },
  });
};

export const useUploadProfileImage = () => {
  return useMutation({
    mutationFn: (imageFile: File) => {
      return uploadActivityImage(imageFile);
    },
    onError: (error) => {
      console.error("이미지 업로드 실패:", error);
    },
  });
};

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateActivityRequest) => {
      return createActivity(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: myActivitiesKeys.list() });
      queryClient.invalidateQueries({ queryKey: activityIdKeys.all });
    },
    onError: (error) => {
      console.error("체험 등록 실패:", error);
    },
  });
};

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ activityId, data }: { activityId: number; data: UpdateActivityRequest }) => {
      return updateActivity(activityId, data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: myActivitiesKeys.list() });
      queryClient.invalidateQueries({ queryKey: activityIdKeys.detail(variables.activityId) });
    },
    onError: (error) => {
      console.error("체험 수정 실패:", error);
    },
  });
};

export const useDeleteActivity = () => {
  return useMutation({
    mutationFn: (activityId: number) => {
      return deleteActivity(activityId);
    },
    onError: (error) => {
      console.error("체험 삭제 실패:", error);
    },
  });
};
