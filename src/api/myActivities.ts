import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { GetMyActivitiesParams } from "@/types/myActivities";

export const getMyActivities = async (params: GetMyActivitiesParams) => {
  const response = await client.get(API_ENDPOINTS.MY_ACTIVITIES.LIST, { params });
  return response.data;
};
