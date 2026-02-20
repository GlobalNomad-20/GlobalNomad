import { motion } from "framer-motion";

import { useReservationController } from "../../../_hooks/useReservationController";

import ExistingReservationModal from "./Modal/ExistingReservationModal";
import LoginErrorModal from "./Modal/LoginErrorModal";
import ReservationSuccessModal from "./Modal/ReservationSuccessModal";
import ReservationModal from "./ReservationModal";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useModal } from "@/hooks/useModal";
import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ReservationBarProps {
  data?: ActivityDetailResponse;
}

const ReservationBar = ({ data }: ReservationBarProps) => {
  const { isOpen, onOpen: handleOpen, onClose: handleClose } = useModal();
  const reservationController = useReservationController(data?.id, data?.price);

  const {
    selectedDate,
    reservationTime,
    schedules,
    buttonActive,
    onSuccessClose: handleSuccessClose,
    onLoginClose: handleLoginClose,
    onExistClose: handleExistClose,
  } = reservationController;

  const displayDate = selectedDate ? selectedDate.slice(2).replace(/-/g, "/") : "";

  const daySchedule = schedules?.find((schedule) => {
    return schedule.date === selectedDate;
  });

  const timeSlot = daySchedule?.times?.find((time) => {
    return time.id === reservationTime;
  });

  const displayTime = timeSlot ? `${timeSlot.startTime} ~ ${timeSlot.endTime}` : "";
  const displayText = buttonActive ? `${displayDate} ${displayTime}` : "날짜 선택하기";

  return (
    <>
      <div
        className="py flex h-31 w-full flex-col justify-center gap-3 border-t border-[#E6E6E6]
          bg-white px-6 py-4.5"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-1.5">
            <div className="typo-18-b text-gray-950">₩ {data?.price}</div>
            <div className="typo-16-m text-[#79747E]">/ 1명</div>
          </div>
          <div
            className="typo-16-b text-primary-500 underline active:text-sky-600"
            onClick={handleOpen}
          >
            {displayText}
          </div>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              onClose={handleClose}
              position="bottom"
              containerClassName="h-auto"
            >
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ReservationModal
                  onClose={handleClose}
                  reservationController={reservationController}
                />
              </motion.div>
            </Modal>
          )}
        </div>
        <Button
          variant={reservationController.buttonActive ? "primary" : "disabled"}
          onClick={reservationController.handleReserve}
          disabled={!reservationController.buttonActive}
          className="typo-16-b w-full"
        >
          예약하기
        </Button>
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

export default ReservationBar;
