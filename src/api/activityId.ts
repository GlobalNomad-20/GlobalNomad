import axios from "axios";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";

const getActivityId = async (activityId: number) => {
  const response = await axios.get(BASE_URL + API_ENDPOINTS.ACTIVITIES.DETAIL(activityId));

  return response.data;
};

export default getActivityId;
