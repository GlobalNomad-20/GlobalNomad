import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface CalendarHeaderProps {
  children: ReactNode;
  className?: string;
}

const CalenderHeader = ({ children, className }: CalendarHeaderProps) => {
  return (
    <div
      className={cn(
        "py flex items-center justify-center gap-2.5 pt-3 pb-5 md:gap-7.5 md:pt-7.5 md:pb-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CalenderHeader;
