import { API_ENDPOINTS } from "@/constants/apiEndPoint";
import { client } from "@/lib/client/client";
import { GetAvailableScheduleParams } from "@/types/activityReservationSchedule";

const getAvailableSchedule = async ({ activityId, year, month }: GetAvailableScheduleParams) => {
  const response = await client.get(API_ENDPOINTS.ACTIVITIES.AVAILABLE_SCHEDULE(activityId), {
    params: {
      year,
      month,
    },
  });

  return response.data;
};

export default getAvailableSchedule;
