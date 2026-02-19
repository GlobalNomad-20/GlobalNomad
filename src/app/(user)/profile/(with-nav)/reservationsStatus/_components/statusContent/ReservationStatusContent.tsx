/* eslint-disable react/jsx-handler-names */
"use client";

import { useReservationFilter } from "../../_hooks/useReservationFilter";

import StatusTab from "./StatusTab";
import TimeDropdown from "./TimeDropdown";

import DeleteSvg from "@/assets/svg/DeleteSvg";
import { useReservedSchedule } from "@/hooks/queries/useMyActivities";
import { formatShortKoreanDate } from "@/utils/date";

interface ReservationStatusContentProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const ReservationStatusContent = ({
  activityId,
  date,
  onClose: handleClose,
}: ReservationStatusContentProps) => {
  const { data: scheduleData } = useReservedSchedule(activityId, date);

  const { activeSchedule, currentTab, currentCounts, setSelectedScheduleId, setCurrentTab } =
    useReservationFilter(scheduleData);

  return (
    <div className="item flex flex-col">
      <div className="flex flex-col px-6 pt-6 pb-5">
        <div
          className="typo-18-b lg:typo-20-b mb-3 flex flex-row items-center justify-between
            text-gray-950"
        >
          <h3>{formatShortKoreanDate(date)}</h3>
          <button onClick={handleClose} className="hidden hover:cursor-pointer lg:block">
            <DeleteSvg />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="typo-16-b lg:typo-18-b text-[#1B1B1B]">예약 시간</span>
          <TimeDropdown
            schedules={scheduleData}
            selectedSchedule={activeSchedule}
            onChange={setSelectedScheduleId}
          />
        </div>
      </div>
      <div className="custom-scrollbar flex flex-col">
        <div className="flex flex-col px-6 pb-5">
          <div className="">
            <span className="typo-16-b lg:typo-18-b text-[#1B1B1B]">예약 내역</span>
          </div>
          <StatusTab counts={currentCounts} currentTab={currentTab} onChangeTab={setCurrentTab} />
          <div className="mt-5 flex w-full flex-col gap-3">
            {activityId ? (
              <>
                <div
                  className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm
                    text-gray-500 shadow-sm"
                >
                  예약 내역 리스트 (ScheduleList)
                </div>
              </>
            ) : (
              <div
                className="rounded-lg border border-gray-200 bg-white p-6 text-center text-sm
                  text-gray-500 shadow-sm"
              >
                예약 가능한 시간이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationStatusContent;
