"use client";

import ReservationBadgeItem from "./ReservationBadgeItem";

import { RESERVATION_STATUS_BADGES } from "@/constants/reservationBadgeItem";
import { ReservationStatus } from "@/types/reservations";
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

const ReservationBadge = ({
  selectedStatus,
  onStatusChange: handleStatusChange,
}: ReservationBadgeProps) => {
  return (
    <div
      className={cn(
        "mb-3 flex gap-2 overflow-x-auto md:mb-7.5 md:overflow-x-visible",
        "scrollbar-hide",
      )}
    >
      {statusOptions.map((option) => {
        return (
          <ReservationBadgeItem
            key={option.key ?? "all"}
            label={option.label}
            statusKey={option.key}
            isSelected={selectedStatus === option.key}
            onClick={handleStatusChange}
          />
        );
      })}
    </div>
  );
};

export default ReservationBadge;
