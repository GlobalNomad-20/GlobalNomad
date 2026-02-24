import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { GetActivitiesParams } from "@/types/getActivitiesParams";

const getActivities = async (params: GetActivitiesParams) => {
  const response = await client.get(API_ENDPOINTS.ACTIVITIES.LIST, { params });
  return response.data;
};

export default getActivities;
