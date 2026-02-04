import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import {
  GetReservationsParams,
  ReservationReviewRequest,
  ReservationStatus,
} from "@/types/reservations";

export const getReservations = async (params: GetReservationsParams) => {
  const response = await client.get(API_ENDPOINTS.MY_RESERVATIONS.LIST, { params });
  return response.data;
};

export const deleteReservation = async (reservationId: number, status: ReservationStatus) => {
  const response = await client.patch(API_ENDPOINTS.MY_RESERVATIONS.UPDATE(reservationId), {
    status,
  });
  return response.data;
};

export const createReservationReview = async (
  reservationId: number,
  reviewData: ReservationReviewRequest,
) => {
  const response = await client.post(
    API_ENDPOINTS.MY_RESERVATIONS.REVIEWS(reservationId),
    reviewData,
  );
  return response.data;
};
