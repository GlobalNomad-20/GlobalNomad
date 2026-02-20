"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyActivitiesQueryOptions } from "./options/myActivitiesOptions";

import { activityIdKeys, myActivitiesKeys } from "@/lib/query/queryKeys";
import { ReservationDashboardResponse, ReservedScheduleResponse } from "@/types/activity";
import {
  ActivityReservationsResponse,
  CreateActivityRequest,
  FetchReservationsParams,
  GetMyActivitiesParams,
  UpdateActivityRequest,
} from "@/types/myActivities";
import {
  createActivity,
  deleteActivity,
  fetchActivityReservations,
  fetchReservationDashboard,
  fetchReservedSchedule,
  updateActivity,
  uploadActivityImage,
} from "@/api/myActivities";

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

export const useActivityReservations = ({
  activityId,
  scheduleId,
  status,
  size,
  cursorId,
}: FetchReservationsParams) => {
  return useQuery<ActivityReservationsResponse>({
    queryKey: myActivitiesKeys.reservations(activityId, scheduleId, status, size, cursorId),
    queryFn: () => {
      return fetchActivityReservations({ activityId, scheduleId, status, size, cursorId });
    },
    enabled: !!activityId && !!scheduleId && !!status,
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
