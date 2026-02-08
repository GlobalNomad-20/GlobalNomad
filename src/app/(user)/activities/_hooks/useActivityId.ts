"use client";

import { useQuery } from "@tanstack/react-query";

import getActivityId from "@/api/activityId";
import { ActivityDetailResponse } from "@/types/activityIdParams";

const useActivityId = (activityId: number) => {
  return useQuery<ActivityDetailResponse>({
    queryKey: ["activities", activityId],
    queryFn: () => {
      return getActivityId(activityId);
    },
  });
};

export default useActivityId;
