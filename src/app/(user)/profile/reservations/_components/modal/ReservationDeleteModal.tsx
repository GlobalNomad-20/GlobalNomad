import Image from "next/image";
import { useState } from "react";

import ReservationDeleteCompleteModal from "./ReservationDeleteCompleteModal";

import Button from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { useDeleteReservation } from "@/hooks/queries/useReservations";
import Modal from "@/components/common/Modal";

interface ReservationDeleteModalProps {
  reservationId: number;
  isOpen: boolean;
  onClose: () => void;
  onBackgroundClick?: () => void;
}

const ReservationDeleteModal = ({
  reservationId,
  isOpen,
  onClose: handleClose,
  onBackgroundClick: handleBackgroundClick,
}: ReservationDeleteModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: deleteReservation, isPending } = useDeleteReservation();

  const handleSafeClose = () => {
    if (isPending) return;
    setIsSuccess(false);
    handleClose();
  };

  const handleSafeBackgroundClick = () => {
    if (isPending) return;
    if (handleBackgroundClick) handleBackgroundClick();
    else handleSafeClose();
  };

  const handleRequest = () => {
    deleteReservation(
      { reservationId, status: "canceled" },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: () => {
          alert("예약 취소 중 오류가 발생했습니다.");
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleSafeClose}
      onBackgroundClick={handleSafeBackgroundClick}
      containerClassName="h-46 w-80 md:h-60.5 md:w-100 m-5"
    >
      {isSuccess ? (
        <ReservationDeleteCompleteModal onClose={handleClose} />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-5 md:gap-6">
          <div className="flex flex-col items-center justify-center">
            <Image
              width={88}
              height={88}
              src="/image/warning.png"
              alt="경고 이미지"
              className="h-12 w-12 md:h-22 md:w-22"
            />
            <div className="typo-16-b md:typo-18-b">예약을 취소하시겠어요?</div>
          </div>
          <div className="flex gap-2 md:gap-3">
            <Button
              onClick={handleSafeClose}
              variant="outline"
              className="typo-14-m md:typo-16-m h-10 w-28 md:h-12 md:w-34"
            >
              아니오
            </Button>
            <Button
              onClick={handleRequest}
              disabled={isPending}
              className={cn(
                "typo-14-m md:typo-16-m h-10 w-28 md:h-12 md:w-34",
                "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
                "disabled:border-none disabled:shadow-none",
              )}
            >
              {isPending ? "취소 중..." : "취소하기"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ReservationDeleteModal;
