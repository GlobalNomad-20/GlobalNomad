import { useMutation } from "@tanstack/react-query";

import createActivityReservation from "@/api/activityReservation";
import { CreateActivityReservationRequestBody } from "@/types/activityReservation";

const useCreateActivityReservation = (activityId?: number) => {
  return useMutation({
    mutationFn: (body: CreateActivityReservationRequestBody) => {
      if (!activityId) throw new Error("activityId가 존재하지 않습니다");
      return createActivityReservation(activityId, body);
    },
  });
};

export default useCreateActivityReservation;
