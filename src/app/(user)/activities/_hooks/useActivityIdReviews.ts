import { keepPreviousData, useQuery } from "@tanstack/react-query";

import getActiviyIdReviews from "@/api/activityIdReviews";
import { activityIdKeys } from "@/lib/query/queryKeys";
import { GetActivityIdReviewsParam, GetReviewsResponse } from "@/types/activityIdReviews";

const useActivityIdReviews = (params: GetActivityIdReviewsParam) => {
  const { activityId, page = 1, size = 10 } = params;

  return useQuery<GetReviewsResponse>({
    queryKey: activityIdKeys.reviews(activityId, page, size),
    queryFn: () => {
      return getActiviyIdReviews({ activityId, page, size });
    },
    placeholderData: keepPreviousData,
  });
};

export default useActivityIdReviews;
