import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { CreateActivityReservationRequestBody } from "@/types/activityReservation";

const createActivityReservation = (
  activityId: number,
  body: CreateActivityReservationRequestBody,
) => {
  return client.post(API_ENDPOINTS.ACTIVITIES.RESERVATIONS(activityId), body);
};

export default createActivityReservation;
