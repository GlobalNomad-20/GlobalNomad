"use client";

import { useQuery } from "@tanstack/react-query";

import getActivityId from "@/api/activityId";
import { activityIdKeys } from "@/lib/query/queryKeys";
import { ActivityDetailResponse } from "@/types/activityIdParams";

const useActivityId = (activityId: number) => {
  return useQuery<ActivityDetailResponse>({
    queryKey: activityIdKeys.detail(activityId),
    queryFn: () => {
      return getActivityId(activityId);
    },
  });
};

export default useActivityId;
