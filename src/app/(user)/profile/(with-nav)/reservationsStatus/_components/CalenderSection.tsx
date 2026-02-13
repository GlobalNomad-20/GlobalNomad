"use client";

import { useState } from "react";

import ReservationsListPopup from "./popup/ReservationsListPopup";

import { CalendarEvent } from "@/components/calenderView/CalendarEventItem";
import CalendarView from "@/components/calenderView/CalenderView";
import { Activity } from "@/types/activityCardList";

interface CalendarSectionProps {
  events: Record<string, CalendarEvent[]>;
}

const CalendarSection = ({ events }: CalendarSectionProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleSelectedAcivity = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleDateClick = (date: string) => {
    console.log(`${date} 클릭됨`);
  };

  return (
    <>
      <ReservationsListPopup selectedActivity={selectedActivity} onClick={handleSelectedAcivity} />
      <CalendarView events={events} onDateClick={handleDateClick} />
    </>
  );
};

export default CalendarSection;
