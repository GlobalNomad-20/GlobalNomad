import { cn } from "@/utils/cn";

export type EventType = "완료" | "예약" | "승인";

export interface CalendarEvent {
  id: string | number;
  title: string;
  type: EventType;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const EVENT_STYLES: Record<EventType, string> = {
  예약: "bg-primary-100 text-primary-500 ",
  완료: "bg-gray-50 text-gray-500 ",
  승인: "bg-[#FFF8DD] text-orange-400",
};

interface CalendarEventItemProps {
  event: CalendarEvent;
  className?: string;
}

const CalendarEventItem = ({ event, className }: CalendarEventItemProps) => {
  const styleClass = EVENT_STYLES[event.type] || EVENT_STYLES["예약"];

  return (
    <span
      className={cn(
        "typo-11-m md:typo-14-m truncate rounded py-0.5 text-center",
        styleClass,
        className,
      )}
    >
      {event.title}
    </span>
  );
};

export default CalendarEventItem;
