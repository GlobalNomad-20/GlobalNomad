"use client";

import { useState } from "react";

import { useCalendarQuery } from "../_hooks/useCalendarQuery";
import { useReservationList } from "../_hooks/useReservationList";
import { transformToCalendarEvents } from "../_utils/formattedEvents";

import EmptyReservationSection from "./EmptyReservationSection";
import ReservationsListPopup from "./popup/ReservationsListPopup";
import ResponsiveStatusOverlay from "./ResponsiveStatusOverlay";

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

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const controlledDate = new Date(Number(year), Number(month) - 1, 1);
  const activityId = selectedActivity?.id;

  const { data: dashboardData } = useReservationDashboard(activityId as number, year, month);
  const formattedEvents = transformToCalendarEvents(dashboardData);

  const handleDateClick = (date: string) => {
    if (formattedEvents[date] !== undefined) {
      setSelectedDate(date);
    }
  };

  const handleCloseOverlay = () => {
    return setSelectedDate(null);
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
      {selectedDate && activityId && (
        <ResponsiveStatusOverlay
          activityId={activityId}
          date={selectedDate}
          onClose={handleCloseOverlay}
        />
      )}
    </>
  );
};

export default CalendarSection;
