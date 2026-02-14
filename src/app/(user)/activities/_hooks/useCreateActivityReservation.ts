import { useMutation } from "@tanstack/react-query";

import createActivityReservation from "@/api/activityReservation";
import { CreateActivityReservationRequestBody } from "@/types/activityReservation";

const useCreateActivityReservation = (activityId: number) => {
  return useMutation({
    mutationFn: (body: CreateActivityReservationRequestBody) => {
      return createActivityReservation(activityId, body);
    },
  });
};

export default useCreateActivityReservation;
