"use client";

import { InfiniteData } from "@tanstack/react-query";

import ReservationsList from "./ReservationsList";

import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";
import { usePopup } from "@/hooks/usePopup";
import { Activity } from "@/types/activityCardList";
import { MyActivitiesResponse } from "@/types/myActivities";
import { cn } from "@/utils/cn";

interface ReservationsListPopupProps {
  data: InfiniteData<MyActivitiesResponse, unknown> | undefined;
  selectedActivity: Activity | null;
  isNext: boolean;
  onReachEnd: () => void;
  onClick: (activity: Activity) => void;
}

const ReservationsListPopup = ({
  data,
  selectedActivity,
  isNext,
  onClick: handleClick,
  onReachEnd: handleReachEnd,
}: ReservationsListPopupProps) => {
  const { popupRef, triggerRef, open, handleToggle, handleClose } = usePopup();

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className="mb-4 flex w-full items-center justify-between rounded-2xl border border-gray-100
          bg-white px-5 py-3.75 shadow-[0px_2px_6px_0px_#00000005] hover:cursor-pointer md:mb-6
          lg:mb-7.5"
      >
        <h4 className="typo-14-m md:typo-16-m">
          {selectedActivity ? selectedActivity.title : "체험을 선택해주세요"}
        </h4>
        <DropdownArrowSvg />
      </button>
      {open && (
        <div
          ref={popupRef}
          className={cn(
            `absolute z-50 flex flex-col rounded-2xl border border-gray-100 bg-white px-2 py-4
            shadow-[0px_2px_6px_0px_#00000005]`,
            "top-15 right-0 left-auto w-full",
          )}
        >
          <ReservationsList
            data={data}
            isNext={isNext}
            onReachEnd={handleReachEnd}
            onClose={handleClose}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationsListPopup;
