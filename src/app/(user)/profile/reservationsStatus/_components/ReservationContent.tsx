"use client";

import CalendarSection from "./CalenderSection";
import EmptyReservationSection from "./EmptyReservationSection";

import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";

interface ReservationContentProps {
  reservations: Record<string, CalendarEvent[]>;
}

const ReservationContent = ({ reservations }: ReservationContentProps) => {
  const hasReservations = Object.keys(reservations).length > 0;

  if (hasReservations) {
    return <CalendarSection events={reservations} />;
  }

  return <EmptyReservationSection />;
};

export default ReservationContent;
