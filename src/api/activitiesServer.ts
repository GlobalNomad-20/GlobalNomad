import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { fetchWithAuth } from "@/lib/auth/auth";
import { MyActivityDetailResponse } from "@/types/myActivities";

export const fetchMyDetailActivityServer = async (
  activityId: number,
): Promise<MyActivityDetailResponse | null> => {
  const url = `${BASE_URL}${API_ENDPOINTS.ACTIVITIES.DETAIL(activityId)}`;

  return fetchWithAuth<MyActivityDetailResponse>(url);
};
