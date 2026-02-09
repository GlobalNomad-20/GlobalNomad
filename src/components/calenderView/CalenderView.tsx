"use client";
import CalendarCell from "./CalendarCell";
import { CalendarEvent } from "./CalendarEventItem"; // 타입 import
import CalendarGrid from "./CalendarGrid";
import CalendarHeader from "./CalendarHeader";
import CalendarNav from "./CalendarNav";
import CalendarRoot from "./CalendarRoot";

import AltArrowLeftSvg from "@/assets/svg/AltArrowLeftSvg";
import AltArrowRightSvg from "@/assets/svg/AltArrowRightSvg";
import { useCalendar } from "@/hooks/calender/useCalendar";
import { cn } from "@/utils/cn";

interface CalendarViewProps {
  events?: Record<string, CalendarEvent[]>;
  onDateClick?: (date: string) => void;
  className?: string;
}

const CalendarView = ({
  events = {},
  onDateClick: handleDateClick,
  className,
}: CalendarViewProps) => {
  const {
    currentDate,
    days,
    prevMonth: handlePrevMonth,
    nextMonth: handleNextMonth,
  } = useCalendar();

  return (
    <CalendarRoot
      className={cn(
        "rounded-xl bg-white text-[#1B1B1B] shadow-[0px_4px_24px_0px_#9CB4CA33]",
        className,
      )}
    >
      <CalendarHeader>
        <CalendarNav onClick={handlePrevMonth}>
          <AltArrowLeftSvg />
        </CalendarNav>
        <h2 className="typo-20-b">
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </h2>
        <CalendarNav onClick={handleNextMonth}>
          <AltArrowRightSvg />
        </CalendarNav>
      </CalendarHeader>
      <CalendarGrid
        days={days}
        className="border-gray-200"
        renderDay={(day) => {
          return (
            <CalendarCell day={day} events={events[day.dateStr] || []} onClick={handleDateClick} />
          );
        }}
      />
    </CalendarRoot>
  );
};

export default CalendarView;
