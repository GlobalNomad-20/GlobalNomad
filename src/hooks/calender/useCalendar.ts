"use client";

import { useState } from "react";

import { CalendarDay, getDynamicCalendarData } from "@/utils/calendar";

export const useCalendar = (initialDate: Date = new Date()) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days: CalendarDay[] = getDynamicCalendarData(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  return {
    currentDate,
    days,
    prevMonth,
    nextMonth,
    setCurrentDate,
  };
};
