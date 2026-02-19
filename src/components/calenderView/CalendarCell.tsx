"use client";

import CalendarEventItem, { CalendarEvent } from "./CalendarEventItem";

import { CalendarDay } from "@/utils/calendar";
import { cn } from "@/utils/cn";

interface CalendarCellProps {
  day: CalendarDay;
  events: CalendarEvent[];
  onClick?: (date: string, element: HTMLElement) => void;
}

const CalendarCell = ({ day, events, onClick }: CalendarCellProps) => {
  const hasEvents = events.length > 0;

  const isToday = day.dateStr === new Date().toISOString().split("T")[0];

  return (
    <div
      // eslint-disable-next-line react/jsx-handler-names
      onClick={(e) => {
        return onClick?.(day.dateStr, e.currentTarget);
      }}
      className={cn(
        `relative flex min-h-31 cursor-pointer flex-col gap-1 pt-4.5 transition-colors
        hover:bg-gray-50`,
        !day.isCurrentMonth && "bg-gray-50/50 text-gray-400",
      )}
    >
      <span
        className={cn(
          "relative mx-auto flex w-8 justify-center",
          "typo-16-m rounded-full py-0.5 text-center text-gray-800",
          isToday && "bg-blue-600 text-white",
        )}
      >
        {day.date}
        {hasEvents && (
          <span className="absolute -top-1 right-0 h-1.5 w-1.5 rounded-full bg-red-500" />
        )}
      </span>
      <div className="mt-1 flex flex-col gap-1 px-1">
        {events.map((evt) => {
          return <CalendarEventItem key={evt.id} event={evt} />;
        })}
      </div>
    </div>
  );
};

export default CalendarCell;
