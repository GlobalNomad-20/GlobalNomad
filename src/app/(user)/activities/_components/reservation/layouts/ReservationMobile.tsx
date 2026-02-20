"use client";

import { useState } from "react";

import DateSelector from "../components/DateSelector";
import GuestSelector from "../components/GuestSelector";
import TimeSelector from "../components/TimeSelector";

import SwiperPrevSvg from "@/assets/svg/SwiperPrevSvg";
import Button from "@/components/common/Button";

interface ReservationMobileProps {
  onComplete: () => void;
}

const ReservationMobile = ({ onComplete }: ReservationMobileProps) => {
  const [nextStep, setNextStep] = useState(true);

  const handlePrevStep = () => {
    setNextStep(true);
  };

  const handleNextStep = () => {
    if (nextStep) {
      setNextStep(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex h-auto w-full flex-col p-6">
      {nextStep ? (
        <div className="max-h-125 w-full overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div>
              <p className="typo-18-b md:typo-20-b mb-2 text-gray-950">날짜</p>
              <DateSelector />
            </div>
            <TimeSelector />
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="mb-2 flex items-center gap-2.75">
            <button onClick={handlePrevStep}>
              <SwiperPrevSvg className="h-[15.5px] w-[18.5px] cursor-pointer" />
            </button>
            <div className="typo-18-b text-gray-950">인원</div>
          </div>
          <div className="typo-16-m mb-5 text-[#4B4B4B]">예약할 인원을 선택해주세요</div>
          <GuestSelector />
        </div>
      )}
      <Button className="typo-16-b bottom sticky z-20 mt-6 w-full" onClick={handleNextStep}>
        확인
      </Button>
    </div>
  );
};

export default ReservationMobile;
