"use client";

import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

import getActivities from "@/api/activities";
import getActivityId from "@/api/activityId";
import getActiviyIdReviews from "@/api/activityIdReviews";
import createActivityReservation from "@/api/activityReservation";
import getAvailableSchedule from "@/api/availableSchedule";
import { activitiesKeys, activityIdKeys, activityScheduleKeys } from "@/lib/query/queryKeys";
import { ActivitiesResponse } from "@/types/activityCardList";
import { ActivityDetailResponse } from "@/types/activityIdParams";
import { GetActivityIdReviewsParam, GetReviewsResponse } from "@/types/activityIdReviews";
import { CreateActivityReservationRequestBody } from "@/types/activityReservation";
import {
  AvailableScheduleByDate,
  UseAvailableScheduleParams,
} from "@/types/activityReservationSchedule";
import { GetActivitiesParams } from "@/types/getActivitiesParams";

export const useActivities = (params: GetActivitiesParams) => {
  const { category, keyword, sort, page, size, method = "offset" } = params;
  return useQuery<ActivitiesResponse>({
    queryKey: activitiesKeys.list(category, keyword, sort, page, size, method),
    queryFn: () => {
      return getActivities({
        category,
        keyword,
        sort,
        page,
        size,
        method,
      });
    },
    placeholderData: keepPreviousData,
  });
};

export const useInfiniteActivities = (params: GetActivitiesParams) => {
  const { sort, method = "cursor", size = 8 } = params;
  return useInfiniteQuery<
    ActivitiesResponse,
    Error,
    InfiniteData<ActivitiesResponse>,
    unknown[],
    number | null
  >({
    queryKey: activitiesKeys.popular(sort, method),
    queryFn: ({ pageParam }) => {
      return getActivities({
        cursorId: pageParam,
        sort,
        method,
        size,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId ?? undefined;
    },
  });
};

export const useActivityId = (activityId: number) => {
  return useQuery<ActivityDetailResponse>({
    queryKey: activityIdKeys.detail(activityId),
    queryFn: () => {
      return getActivityId(activityId);
    },
  });
};

export const useActivityIdReviews = (params: GetActivityIdReviewsParam) => {
  const { activityId, page = 1, size = 10 } = params;

  return useQuery<GetReviewsResponse>({
    queryKey: activityIdKeys.reviews(activityId, page, size),
    queryFn: () => {
      return getActiviyIdReviews({ activityId, page, size });
    },
    placeholderData: keepPreviousData,
  });
};

export const useAvailableSchedule = ({ activityId, year, month }: UseAvailableScheduleParams) => {
  return useQuery<AvailableScheduleByDate[]>({
    queryKey: activityScheduleKeys.list(activityId, year, month),
    enabled: !!activityId && !!year && !!month,
    queryFn: () => {
      return getAvailableSchedule({
        activityId: activityId as number,
        year: year as string,
        month: month as string,
      });
    },
  });
};

export const useCreateActivityReservation = (activityId?: number) => {
  return useMutation({
    mutationFn: (body: CreateActivityReservationRequestBody) => {
      if (!activityId) throw new Error("activityId가 존재하지 않습니다");
      return createActivityReservation(activityId, body);
    },
  });
};
