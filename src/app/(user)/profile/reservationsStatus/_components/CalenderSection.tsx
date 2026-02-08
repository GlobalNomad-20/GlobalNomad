"use client";

import ReservationsListPopup from "./popup/ReservationsListPopup";

import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";
import CalendarView from "@/components/calenderView/CalenderView";

interface CalendarSectionProps {
  events: Record<string, CalendarEvent[]>;
}

const CalendarSection = ({ events }: CalendarSectionProps) => {
  const handleDateClick = (date: string) => {
    console.log(`${date} 클릭됨`);
  };

  return (
    <>
      <ReservationsListPopup />
      <CalendarView events={events} onDateClick={handleDateClick} />
    </>
  );
};

export default CalendarSection;
