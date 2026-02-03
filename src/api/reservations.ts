import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { GetMyReservationsParams } from "@/types/getReservationsParams";

const getReservations = async (params: GetMyReservationsParams) => {
  const response = await client.get(API_ENDPOINTS.MY_RESERVATIONS.LIST, { params });
  return response.data;
};

export default getReservations;
