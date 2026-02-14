import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";
import { ReservationDashboardResponse } from "@/types/activity";

export const transformToCalendarEvents = (dashboardData?: ReservationDashboardResponse) => {
  if (!dashboardData || dashboardData.length === 0) return {};

  const eventsMap: Record<string, CalendarEvent[]> = {};
  let eventIdCounter = 1;

  dashboardData.forEach(({ date, reservations }) => {
    const dailyEvents: CalendarEvent[] = [];

    if (reservations.completed > 0) {
      dailyEvents.push({
        id: eventIdCounter++,
        title: `완료 ${reservations.completed}`,
        type: "완료",
      });
    }
    if (reservations.confirmed > 0) {
      dailyEvents.push({
        id: eventIdCounter++,
        title: `승인 ${reservations.confirmed}`,
        type: "승인",
      });
    }
    if (reservations.pending > 0) {
      dailyEvents.push({
        id: eventIdCounter++,
        title: `예약 ${reservations.pending}`,
        type: "예약",
      });
    }

    if (dailyEvents.length > 0) {
      eventsMap[date] = dailyEvents;
    }
  });

  return eventsMap;
};
