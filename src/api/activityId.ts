import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";

const getActivityId = async (activityId: number) => {
  const response = await client.get(API_ENDPOINTS.ACTIVITIES.DETAIL(activityId));

  return response.data;
};

export default getActivityId;
