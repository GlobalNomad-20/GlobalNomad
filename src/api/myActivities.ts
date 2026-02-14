import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { ReservationDashboardResponse } from "@/types/activity";
import { GetMyActivitiesParams } from "@/types/myActivities";

export const getMyActivities = async (params: GetMyActivitiesParams) => {
  const response = await client.get(API_ENDPOINTS.MY_ACTIVITIES.LIST, { params });
  return response.data;
};

export const fetchReservationDashboard = async (
  activityId: number,
  year: string,
  month: string,
) => {
  const response = await client.get<ReservationDashboardResponse>(
    API_ENDPOINTS.MY_ACTIVITIES.RESERVATION_DASHBOARD(activityId),
    {
      params: { year, month },
    },
  );

  return response.data;
};
