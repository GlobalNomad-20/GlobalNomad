// eslint-disable-next-line check-file/filename-naming-convention
import { API_ENDPOINTS, BASE_URL } from "@/constants/apiEndPoint";
import { fetchWithAuth } from "@/lib/auth/auth";
import { GetMyActivitiesParams, MyActivitiesResponse } from "@/types/myActivities";

export const getMyActivitiesServer = async (
  params: GetMyActivitiesParams,
): Promise<MyActivitiesResponse> => {
  const url = new URL(`${BASE_URL}${API_ENDPOINTS.MY_ACTIVITIES.LIST}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const data = await fetchWithAuth<MyActivitiesResponse>(url.toString());

  if (!data) {
    throw new Error("서버에서 체험 리스트를 불러오는데 실패했습니다.");
  }

  return data;
};
