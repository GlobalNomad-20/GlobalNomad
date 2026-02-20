"use client";

import { useState } from "react";

import { useCalendarQuery } from "../../_hooks/useCalendarQuery";
import { useReservationList } from "../../_hooks/useReservationList";
import { transformToCalendarEvents } from "../../_utils/formattedEvents";
import ReservationsListPopup from "../reservationList/ReservationsListPopup";
import ResponsiveStatusOverlay from "../statusOverlay/ResponsiveStatusOverlay";

import EmptyReservationSection from "./EmptyReservationSection";

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

  const [popupTarget, setPopupTarget] = useState<{ date: string; el: HTMLElement } | null>(null);

  const controlledDate = new Date(Number(year), Number(month) - 1, 1);
  const activityId = selectedActivity?.id;

  const { data: dashboardData } = useReservationDashboard(activityId as number, year, month);
  const formattedEvents = transformToCalendarEvents(dashboardData);

  const handleDateClick = (date: string, el: HTMLElement) => {
    if (formattedEvents[date] !== undefined) {
      setPopupTarget({ date, el });
    }
  };

  const handleCloseOverlay = () => {
    return setPopupTarget(null);
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
      {popupTarget && activityId && (
        <ResponsiveStatusOverlay
          activityId={activityId}
          date={popupTarget.date}
          anchorEl={popupTarget.el}
          onClose={handleCloseOverlay}
        />
      )}
    </>
  );
};

export default CalendarSection;
