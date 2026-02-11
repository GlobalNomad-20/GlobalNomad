import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import getActivities from "@/api/activities";
import { activitiesKeys } from "@/lib/query/queryKeys";
import { ActivitiesResponse } from "@/types/activityCardList";
import { GetActivitiesParams } from "@/types/getActivitiesParams";

const useInfiniteActivities = (params: GetActivitiesParams) => {
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

export default useInfiniteActivities;
