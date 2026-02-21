"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

import "react-day-picker/dist/style.css";

interface DateSelectorProps {
  setSelectedDate: (date: string) => void;
}

const DateSelector = ({ setSelectedDate }: DateSelectorProps) => {
  const [date, setDate] = useState<Date | undefined>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    setDate(selectedDate);

    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = selectedDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate);
  };

  return (
    <div className="w-81.75 md:w-89.75 lg:w-87.5">
      <div className="lg:typo-16-b hidden text-gray-950 lg:block">날짜</div>
      <DayPicker
        classNames={{
          day_button: "flex items-center justify-center w-12 h-9 cursor-pointer",
          selected: "bg-primary-500 text-white rounded-full typo-16-b ",
          today: "bg-primary-100 text-primary-500 rounded-full typo-16-b ",
          caption_label: "typo-16-m text-gray-950 flex items-center h-full",
          week: "h-12",
        }}
        styles={{
          month_grid: {
            width: "100%",
            tableLayout: "fixed",
          },
        }}
        components={{
          Chevron: ({ orientation }) => {
            return orientation === "left" ? (
              <DropdownArrowSvg className="h-1.5 w-2.75 rotate-90" />
            ) : (
              <DropdownArrowSvg className="h-1.5 w-2.75 rotate-270" />
            );
          },
        }}
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        disabled={{ before: today }}
      />
    </div>
  );
};

export default DateSelector;
