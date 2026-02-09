import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface CalendarNavProps {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

const CalendarNav = ({ onClick: handleClick, className, children }: CalendarNavProps) => {
  return (
    <button
      onClick={handleClick}
      className={cn("rounded transition-colors hover:cursor-pointer hover:bg-gray-100", className)}
    >
      {children}
    </button>
  );
};

export default CalendarNav;
