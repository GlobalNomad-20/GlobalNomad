"use client";

import { useCalendarQuery } from "../_hooks/useCalendarQuery";
import { useReservationList } from "../_hooks/useReservationList";
import { transformToCalendarEvents } from "../_utils/formattedEvents";

import EmptyReservationSection from "./EmptyReservationSection";
import ReservationsListPopup from "./popup/ReservationsListPopup";

import CalendarView from "@/components/calenderView/CalenderView";
import { useReservationDashboard } from "@/hooks/queries/useMyActivities";

const CalendarSection = () => {
  const {
    reservationsList,
    selectedActivity,
    isFetchingNextPage,
    isLoading,
    isEmpty,
    handleSelectedActivity,
    handleReachEnd,
  } = useReservationList();

  const { year, month, handleMonthChange } = useCalendarQuery();

  const controlledDate = new Date(Number(year), Number(month) - 1, 1);
  const activityId = selectedActivity?.id;

  const { data: dashboardData } = useReservationDashboard(activityId as number, year, month);

  const formattedEvents = transformToCalendarEvents(dashboardData);

  const handleDateClick = (date: string) => {
    console.log(`${date} 클릭됨`);
  };

  if (isLoading) return null;
  if (isEmpty) return <EmptyReservationSection />;

  return (
    <>
      <ReservationsListPopup
        data={reservationsList}
        selectedActivity={selectedActivity}
        isNext={isFetchingNextPage}
        onClick={handleSelectedActivity}
        onReachEnd={handleReachEnd}
      />
      <CalendarView
        date={controlledDate}
        events={formattedEvents}
        onDateClick={handleDateClick}
        onMonthChange={handleMonthChange}
      />
    </>
  );
};

export default CalendarSection;
