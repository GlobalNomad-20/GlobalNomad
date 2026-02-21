"use client";

import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";
import { usePopup } from "@/hooks/usePopup";
import { ReservedSchedule } from "@/types/activity";
import { cn } from "@/utils/cn";

interface TimeDropdownProps {
  schedules?: ReservedSchedule[];
  selectedSchedule?: ReservedSchedule;
  onChange: (id: number) => void;
}

const TimeDropdown = ({ schedules = [], selectedSchedule, onChange }: TimeDropdownProps) => {
  const {
    popupRef,
    triggerRef,
    open: isOpen,
    handleClose,
    handleToggle,
  } = usePopup<HTMLUListElement, HTMLButtonElement>();

  const displayTime = selectedSchedule
    ? `${selectedSchedule.startTime} - ${selectedSchedule.endTime}`
    : "시간을 선택해 주세요";

  const handleSelect = (id: number) => {
    onChange(id);
    handleClose();
  };

  return (
    <div className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          `flex w-full items-center justify-between rounded-sm border border-gray-300 bg-white px-4
          py-2.5`,
          `text-sm font-medium text-gray-800 transition-colors focus:ring-1 focus:ring-blue-500
          focus:outline-none`,
          isOpen && "border-blue-500 ring-1 ring-blue-500",
        )}
      >
        <span>{displayTime}</span>
        <DropdownArrowSvg
          className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "rotate-0")}
        />
      </button>
      {isOpen && (
        <ul
          ref={popupRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border
            border-gray-200 bg-white shadow-lg"
        >
          {schedules.length > 0 ? (
            schedules.map((schedule) => {
              return (
                <li
                  key={schedule.scheduleId}
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={() => {
                    return handleSelect(schedule.scheduleId);
                  }}
                  className={cn(
                    "cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-gray-100",
                    // 💡 selectedId 대신 넘어온 selectedSchedule의 ID와 비교
                    selectedSchedule?.scheduleId === schedule.scheduleId
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-gray-800",
                  )}
                >
                  {schedule.startTime} - {schedule.endTime}
                </li>
              );
            })
          ) : (
            <li className="px-4 py-3 text-sm text-gray-500">예약 가능한 시간이 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TimeDropdown;
