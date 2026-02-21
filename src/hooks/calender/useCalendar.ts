"use client";

import { useState } from "react";

import { CalendarDay, getDynamicCalendarData } from "@/utils/calendar";

interface UseCalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

export const useCalendar = ({ value, defaultValue, onChange }: UseCalendarProps = {}) => {
  const [internalDate, setInternalDate] = useState(defaultValue || new Date());

  const isControlled = value !== undefined;
  const currentDate = isControlled ? value : internalDate;

  const changeDate = (newDate: Date) => {
    if (!isControlled) {
      setInternalDate(newDate);
    }
    if (onChange) {
      onChange(newDate);
    }
  };

  const prevMonth = () => {
    changeDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    changeDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days: CalendarDay[] = getDynamicCalendarData(
    currentDate.getFullYear(),
    currentDate.getMonth(),
  );

  return { currentDate, days, prevMonth, nextMonth };
};
