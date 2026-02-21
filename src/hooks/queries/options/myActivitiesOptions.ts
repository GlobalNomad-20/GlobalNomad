import { infiniteQueryOptions } from "@tanstack/react-query";

import { getMyActivities } from "@/api/myActivities";
import { myActivitiesKeys } from "@/lib/query/queryKeys";
import { MyActivitiesResponse } from "@/types/myActivities";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getMyActivitiesQueryOptions = (size: number) => {
  return infiniteQueryOptions<MyActivitiesResponse>({
    queryKey: myActivitiesKeys.list(),
    initialPageParam: null as number | null,
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
