import { ReactNode } from "react";

import { CalendarDay } from "@/utils/calendar";
import { cn } from "@/utils/cn";

interface CalendarGridProps {
  days: CalendarDay[];
  renderDay: (day: CalendarDay) => ReactNode;
  className?: string;
}

const CalendarGrid = ({ days, renderDay, className }: CalendarGridProps) => {
  const weeks = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className={cn("bg-white", className)}>
      <div className="typo-16-b grid grid-cols-7 border-b border-gray-100 pb-3">
        {weeks.map((day, idx) => {
          return (
            <div key={day + idx} className={cn("py-3 text-center text-gray-900")}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          const isLastRow = index >= days.length - 7;

          return (
            <div
              key={day.dateStr}
              className={cn("border-b border-gray-50 bg-white", isLastRow && "border-b-0")}
            >
              {renderDay(day)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
