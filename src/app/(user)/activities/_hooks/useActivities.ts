"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import getActivities from "@/lib/server/activities";
import { ActivitiesResponse } from "@/types/activityCardList";
import { GetActivitiesParams } from "@/types/getActivitiesParams";

const useActivities = (params: GetActivitiesParams) => {
  const { category, keyword, sort, page, size, method = "offset" } = params;

  return useQuery<ActivitiesResponse>({
    queryKey: ["activities", category, keyword, sort, page, size, method],
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

export default useActivities;
