"use client";

import { ReservedScheduleCount } from "@/types/activity";
import { ReservationStatus } from "@/types/reservations";
import { cn } from "@/utils/cn";

interface StatusTabProps {
  counts: ReservedScheduleCount;
  currentTab: ReservationStatus;
  onChangeTab: (tab: ReservationStatus) => void;
}

const StatusTab = ({ counts, currentTab, onChangeTab }: StatusTabProps) => {
  const TABS: { id: ReservationStatus; label: string; count: number }[] = [
    { id: "pending", label: "신청", count: counts.pending },
    { id: "confirmed", label: "승인", count: counts.confirmed },
    { id: "declined", label: "거절", count: counts.declined },
  ];

  return (
    <div
      className="flex items-center justify-between gap-2 border-b border-gray-100 lg:justify-start"
    >
      {TABS.map((tab) => {
        return (
          <button
            key={tab.id}
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              onChangeTab(tab.id);
            }}
            className={cn(
              "flex w-full items-center justify-center gap-1 py-2.75 lg:w-17.5",
              currentTab === tab.id
                ? "text-primary-500 border-primary-500 typo-16-b border-b-2"
                : "typo-16-m text-gray-500 hover:text-gray-800",
            )}
          >
            <span>{tab.label}</span>
            <span>{tab.count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusTab;
