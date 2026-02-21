import { useQuery } from "@tanstack/react-query";

import getAvailableSchedule from "@/api/availableSchedule";
import { activityScheduleKeys } from "@/lib/query/queryKeys";
import {
  AvailableScheduleByDate,
  UseAvailableScheduleParams,
} from "@/types/activityReservationSchedule";

const useAvailableSchedule = ({ activityId, year, month }: UseAvailableScheduleParams) => {
  return useQuery<AvailableScheduleByDate[]>({
    queryKey: activityScheduleKeys.list(activityId, year, month),
    enabled: !!activityId && !!year && !!month,
    queryFn: () => {
      return getAvailableSchedule({
        activityId: activityId as number,
        year: year as string,
        month: month as string,
      });
    },
  });
};

export default useAvailableSchedule;
