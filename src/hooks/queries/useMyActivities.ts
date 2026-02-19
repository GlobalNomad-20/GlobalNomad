"use client";

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { activityIdKeys, myActivitiesKeys } from "@/lib/query/queryKeys";
import {
  CreateActivityRequest,
  GetMyActivitiesParams,
  MyActivitiesResponse,
  UpdateActivityRequest,
} from "@/types/myActivities";
import {
  createActivity,
  deleteActivity,
  getMyActivities,
  updateActivity,
  uploadActivityImage,
} from "@/api/myActivities";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activityId: number) => {
      return deleteActivity(activityId);
    },
    onSuccess: (_, activityId) => {
      queryClient.invalidateQueries({ queryKey: myActivitiesKeys.list() });
      queryClient.invalidateQueries({ queryKey: activityIdKeys.detail(activityId) });
    },
    onError: (error) => {
      console.error("체험 삭제 실패:", error);
    },
  });
};
