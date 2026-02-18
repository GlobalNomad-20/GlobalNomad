"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import useAvailableSchedule from "../../../_hooks/useAvailableSchedule";
import useCreateActivityReservation from "../../../_hooks/useCreateActivityReservation";
import LoginErrorModal from "../../common/detail/LoginErrorModal";
import ReservationSuccessModal from "../../common/detail/ReservationSuccessModal";
import DateSelector from "../components/DateSelector";
import GuestSelector from "../components/GuestSelector";
import TimeSelector from "../components/TimeSelector";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ReservationDesktopProps {
  data?: ActivityDetailResponse;
}

const ReservationDesktop = ({ data }: ReservationDesktopProps) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [reservationTime, setReservationTime] = useState<number | undefined>(undefined);
  const [reservationGuest, setReservationGuest] = useState(1);

  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onClose: handleCloseModal } = useModal();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: handleLoginClose } = useModal();

  const hasToken = () => {
    if (typeof window === "undefined") return false;
    return Boolean(localStorage.getItem("accessToken"));
  };

  const buttonActive = reservationTime != undefined;

  const activityId = data?.id;

  const year = selectedDate?.split("-")[0];
  const month = selectedDate?.split("-")[1];

  const { data: ReservationData } = useAvailableSchedule({
    activityId,
    year,
    month,
  });

  const { mutate } = useCreateActivityReservation(activityId);

  const totalPrice = (data?.price ?? 0) * reservationGuest;

  const handleClick = () => {
    if (!hasToken()) {
      onLoginOpen();
      return;
    }

    if (!reservationTime) return;

    const body = { scheduleId: reservationTime, headCount: reservationGuest };
    mutate(body, {
      onSuccess: () => {
        onSuccessOpen();
      },
    });
  };

  return (
    <>
      <div
        className="mt-17 flex flex-col gap-6 rounded-3xl border border-[#DDDDDD] bg-white p-7.5
          shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]"
      >
        <div className="flex items-center justify-start gap-1.25">
          <span className="typo-24-b text-gray-950">￦ {data?.price}원</span>
          <span className="typo-20-m text-[#79747E]">/ 인</span>
        </div>
        <DateSelector setSelectedDate={setSelectedDate} />
        <GuestSelector setReservationGuest={setReservationGuest} />
        <TimeSelector
          schedules={ReservationData}
          selectedDate={selectedDate}
          reservationTime={reservationTime}
          setReservationTime={setReservationTime}
        />
        <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
          <div className="flex items-center justify-start gap-1.5">
            <span className="typo-20-m text-[#79747E]">총 합계</span>
            <span className="typo-20-b text-gray-950">￦ {totalPrice}</span>
          </div>
          <Button
            variant={buttonActive ? "primary" : "disabled"}
            className="typo-16-b h-12.5 w-33.75"
            onClick={handleClick}
            disabled={!buttonActive}
          >
            예약하기
          </Button>
        </div>
      </div>
      {isSuccessOpen && (
        <Modal
          isOpen={isSuccessOpen}
          onClose={handleCloseModal}
          position="center"
          containerClassName="w-80 h-35 md:w-100 md:h-42.5"
        >
          <ReservationSuccessModal onClose={handleCloseModal} />
        </Modal>
      )}
      {isLoginOpen && (
        <Modal
          isOpen={isLoginOpen}
          onClose={handleLoginClose}
          position="center"
          containerClassName="w-80 h-35 md:w-100 md:h-42.5"
        >
          <LoginErrorModal
            onClose={handleLoginClose}
            // eslint-disable-next-line react/jsx-handler-names
            onComplete={() => {
              return router.push("/login");
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default ReservationDesktop;
