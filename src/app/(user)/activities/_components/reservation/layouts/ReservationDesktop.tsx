"use client";

import { useReservationController } from "../../../_hooks/useReservationController";
import ExistingReservationModal from "../../common/detail/Modal/ExistingReservationModal";
import LoginErrorModal from "../../common/detail/Modal/LoginErrorModal";
import ReservationSuccessModal from "../../common/detail/Modal/ReservationSuccessModal";
import DateSelector from "../components/DateSelector";
import GuestSelector from "../components/GuestSelector";
import TimeSelector from "../components/TimeSelector";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ReservationDesktopProps {
  data?: ActivityDetailResponse;
}

const ReservationDesktop = ({ data }: ReservationDesktopProps) => {
  const reservationController = useReservationController(data?.id, data?.price);

  const {
    onSuccessClose: handleSuccessClose,
    onLoginClose: handleLoginClose,
    onExistClose: handleExistClose,
  } = reservationController;

  return (
    <>
      <div
        className="mt-17 flex flex-col gap-6 rounded-3xl border border-[#DDDDDD] bg-white p-7.5
          shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]"
      >
        <div className="flex items-center justify-start gap-1.25">
          <span className="typo-24-b text-gray-950">
            ￦ {data ? new Intl.NumberFormat("ko-KR").format(data?.price) : "-"}원
          </span>
          <span className="typo-20-m text-[#79747E]">/ 인</span>
        </div>

        <DateSelector setSelectedDate={reservationController.setSelectedDate} />
        <GuestSelector setReservationGuest={reservationController.setReservationGuest} />
        <TimeSelector
          schedules={reservationController.schedules}
          selectedDate={reservationController.selectedDate}
          reservationTime={reservationController.reservationTime}
          setReservationTime={reservationController.setReservationTime}
        />

        <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
          <div className="flex items-center justify-start gap-1.5">
            <span className="typo-20-m text-[#79747E]">총 합계</span>
            <span className="typo-20-b text-gray-950">
              ￦{" "}
              {reservationController
                ? new Intl.NumberFormat("ko-KR").format(reservationController.totalPrice)
                : "-"}
            </span>
          </div>

          <Button
            variant={reservationController.buttonActive ? "primary" : "disabled"}
            className="typo-16-b h-12.5 w-33.75"
            onClick={reservationController.handleReserve}
            disabled={!reservationController.buttonActive}
          >
            예약하기
          </Button>
        </div>
      </div>

      {reservationController.isSuccessOpen && (
        <Modal
          isOpen={reservationController.isSuccessOpen}
          onClose={handleSuccessClose}
          position="center"
          containerClassName="w-80 h-35 md:w-100 md:h-42.5"
        >
          <ReservationSuccessModal onClose={handleSuccessClose} />
        </Modal>
      )}

      {reservationController.isLoginOpen && (
        <Modal
          isOpen={reservationController.isLoginOpen}
          onClose={handleLoginClose}
          position="center"
          containerClassName="w-80 h-35 md:w-100 md:h-42.5"
        >
          <LoginErrorModal
            onClose={handleLoginClose}
            onComplete={reservationController.handleLinkLogin}
          />
        </Modal>
      )}

      {reservationController.isExistOpen && (
        <Modal
          isOpen={reservationController.isExistOpen}
          onClose={handleExistClose}
          position="center"
          containerClassName="w-80 h-46.25 md:w-100 md:h-65"
        >
          <ExistingReservationModal onClose={handleExistClose} />
        </Modal>
      )}
    </>
  );
};

export default ReservationDesktop;
