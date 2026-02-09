import axios from "axios";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { GetActivityIdReviewsParam } from "@/types/activityIdReviews";

const getActiviyIdReviews = async (params: GetActivityIdReviewsParam) => {
  const { activityId } = params;

  const response = await axios.get(BASE_URL + API_ENDPOINTS.ACTIVITIES.REVIEWS(activityId), {
    params,
  });

  return response.data;
};

export default getActiviyIdReviews;
