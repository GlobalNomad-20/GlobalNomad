import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface CalendarRootProps {
  children: ReactNode;
  className?: string;
}

const CalendarRoot = ({ children, className }: CalendarRootProps) => {
  return <div className={cn("mx-auto w-full max-w-3xl", className)}>{children}</div>;
};

export default CalendarRoot;
