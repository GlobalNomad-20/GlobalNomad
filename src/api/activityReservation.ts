import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { CreateActivityReservationRequestBody } from "@/types/activityReservation";

const createActivityReservation = async (
  activityId: number,
  body: CreateActivityReservationRequestBody,
) => {
  const response = await client.post(API_ENDPOINTS.ACTIVITIES.RESERVATIONS(activityId), body);
  return response.data;
};

export default createActivityReservation;
