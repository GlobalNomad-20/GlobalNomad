import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { GetActivityIdReviewsParam } from "@/types/activityIdReviews";

const getActiviyIdReviews = async (params: GetActivityIdReviewsParam) => {
  const { activityId } = params;

  const response = await client.get(API_ENDPOINTS.ACTIVITIES.REVIEWS(activityId), {
    params,
  });

  return response.data;
};

export default getActiviyIdReviews;
