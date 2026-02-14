"use client";

import { useReservationList } from "../_hooks/useReservationList";

import EmptyReservationSection from "./EmptyReservationSection";
import ReservationsListPopup from "./popup/ReservationsListPopup";

import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";
import CalendarView from "@/components/calenderView/CalenderView";

const myEvents: Record<string, CalendarEvent[]> = {
  "2026-02-14": [{ id: 1, title: "예약 2", type: "예약" }],
};

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

  const handleDateClick = (date: string) => {
    console.log(`${date} 클릭됨`);
  };

  if (isLoading) {
    return null;
  }

  if (isEmpty) {
    return <EmptyReservationSection />;
  }

  return (
    <>
      <ReservationsListPopup
        data={reservationsList}
        selectedActivity={selectedActivity}
        isNext={isFetchingNextPage}
        onClick={handleSelectedActivity}
        onReachEnd={handleReachEnd}
      />
      <CalendarView events={myEvents} onDateClick={handleDateClick} />
    </>
  );
};

export default CalendarSection;
