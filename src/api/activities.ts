import axios from "axios";

import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { GetActivitiesParams } from "@/types/getActivitiesParams";

const getActivities = async (params: GetActivitiesParams) => {
  const response = await axios.get(BASE_URL + API_ENDPOINTS.ACTIVITIES.LIST, { params });

  return response.data;
};

export default getActivities;
