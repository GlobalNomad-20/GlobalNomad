import { keepPreviousData, useQuery } from "@tanstack/react-query";

import getActiviyIdReviews from "@/api/activityIdReviews";
import { GetActivityIdReviewsParam, GetReviewsResponse } from "@/types/activityIdReviews";

const useActivityIdReviews = (params: GetActivityIdReviewsParam) => {
  const { activityId, page = 1, size = 10 } = params;

  return useQuery<GetReviewsResponse>({
    queryKey: ["activities", activityId, page, size],
    queryFn: () => {
      return getActiviyIdReviews({ activityId, page, size });
    },
    placeholderData: keepPreviousData,
  });
};

export default useActivityIdReviews;
