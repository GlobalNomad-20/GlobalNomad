"use client";

import { RESERVATION_STATUS_BADGES } from "@/constants/reservationBadgeItem";
import { ReservationStatus } from "@/types/getReservationsParams";
import { cn } from "@/utils/cn";

interface ReservationBadgeProps {
  selectedStatus?: ReservationStatus;
  onStatusChange: (status?: ReservationStatus) => void;
}

const statusOptions: Array<{ key: ReservationStatus | undefined; label: string }> = [
  { key: undefined, label: "전체" },
  { key: "pending", label: RESERVATION_STATUS_BADGES.pending.label },
  { key: "confirmed", label: RESERVATION_STATUS_BADGES.confirmed.label },
  { key: "completed", label: RESERVATION_STATUS_BADGES.completed.label },
  { key: "canceled", label: RESERVATION_STATUS_BADGES.canceled.label },
  { key: "declined", label: RESERVATION_STATUS_BADGES.declined.label },
];

const baseStyle = `typo-16-m flex h-10 min-w-25 flex-shrink-0 items-center justify-center rounded-4xl border cursor-pointer transition-colors`;

const ReservationBadge = ({ selectedStatus, onStatusChange }: ReservationBadgeProps) => {
  const handleStatusChange = (status?: ReservationStatus) => {
    return () => {
      onStatusChange(status);
    };
  };

  return (
    <div
      className={cn(
        "mb-3 flex gap-2 overflow-x-auto md:mb-7.5 md:overflow-x-visible",
        "scrollbar-hide",
      )}
    >
      {statusOptions.map((status) => {
        return (
          <button
            key={status.key || "all"}
            type="button"
            onClick={handleStatusChange(status.key)}
            className={cn(
              baseStyle,
              selectedStatus === status.key
                ? "bg-[#333333] text-white"
                : "border-[#D8D8D8] bg-white hover:bg-[#333333] hover:text-white",
            )}
          >
            {status.label}
          </button>
        );
      })}
    </div>
  );
};

export default ReservationBadge;
