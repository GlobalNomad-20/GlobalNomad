"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";

import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";
import "react-day-picker/dist/style.css";

const DateSelector = () => {
  const [date, setDate] = useState<Date | undefined>();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <DayPicker
      classNames={{
        caption: "flex justify-between items-center",
        today: "bg-primary-500 typo-16-b text-white rounded-full",
        selected: "bg-primary-100 text-primary-500 typo-16-b rounded-full",
        caption_label: "typo-16-m text-gray-950",
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
      // eslint-disable-next-line react/jsx-handler-names
      onSelect={setDate}
      disabled={{ before: today }}
    />
  );
};

export default DateSelector;
