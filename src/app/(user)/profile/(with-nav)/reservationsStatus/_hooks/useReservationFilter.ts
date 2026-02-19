import { useState } from "react";

import { ReservedSchedule } from "@/types/activity";
import { ReservationStatus } from "@/types/reservations";

export const useReservationFilter = (scheduleData?: ReservedSchedule[]) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [currentTab, setCurrentTab] = useState<ReservationStatus>("pending");

  const isValidSelection = scheduleData?.some((s) => {
    return s.scheduleId === selectedScheduleId;
  });
  const activeScheduleId = isValidSelection
    ? selectedScheduleId
    : (scheduleData?.[0]?.scheduleId ?? null);

  const activeSchedule = scheduleData?.find((s) => {
    return s.scheduleId === activeScheduleId;
  });
  const currentCounts = activeSchedule?.count || { declined: 0, confirmed: 0, pending: 0 };

  return {
    activeScheduleId,
    activeSchedule,
    currentTab,
    currentCounts,
    setSelectedScheduleId,
    setCurrentTab,
  };
};
