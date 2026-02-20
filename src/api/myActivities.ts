import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { ReservationDashboardResponse, ReservedScheduleResponse } from "@/types/activity";
import {
  ActivityResponse,
  ActivityReservationsResponse,
  CreateActivityRequest,
  FetchReservationsParams,
  GetMyActivitiesParams,
  UpdateActivityRequest,
  UploadActivityImageResponse,
} from "@/types/myActivities";

export const getMyActivities = async (params: GetMyActivitiesParams) => {
  const response = await client.get(API_ENDPOINTS.MY_ACTIVITIES.LIST, { params });
  return response.data;
};

export const createActivity = async (data: CreateActivityRequest) => {
  const response = await client.post<ActivityResponse>(API_ENDPOINTS.ACTIVITIES.CREATE, data);
  return response.data;
};

export const updateActivity = async (activityId: number, data: UpdateActivityRequest) => {
  const response = await client.patch<ActivityResponse>(
    API_ENDPOINTS.MY_ACTIVITIES.UPDATE(activityId),
    data,
  );
  return response.data;
};

export const deleteActivity = async (activityId: number) => {
  const response = await client.delete(API_ENDPOINTS.MY_ACTIVITIES.DELETE(activityId));
  return response.data;
};

export const uploadActivityImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await client.post<UploadActivityImageResponse>(
    API_ENDPOINTS.ACTIVITIES.IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
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

export const fetchReservedSchedule = async (activityId: number, date: string) => {
  const response = await client.get<ReservedScheduleResponse>(
    API_ENDPOINTS.MY_ACTIVITIES.RESERVED_SCHEDULE(activityId),
    {
      params: { date },
    },
  );

  return response.data;
};

export const fetchActivityReservations = async ({
  activityId,
  scheduleId,
  status,
  size,
  cursorId,
}: FetchReservationsParams) => {
  const response = await client.get<ActivityReservationsResponse>(
    API_ENDPOINTS.MY_ACTIVITIES.RESERVATIONS(activityId),
    {
      params: {
        scheduleId,
        status,
        size,
        cursorId,
      },
    },
  );

  return response.data;
};
