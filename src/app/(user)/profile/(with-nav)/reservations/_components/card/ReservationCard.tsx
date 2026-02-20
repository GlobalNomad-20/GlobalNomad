"use client";

import ReservationReviewModal from "../modals/ReservationReviewModal";
import ReservationDeleteModal from "../modals/ReservationDeleteModal";

import Button from "@/components/common/Button";
import CustomImage from "@/components/common/CustomImage";
import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { RESERVATION_STATUS_BADGES } from "@/constants/reservationBadgeItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useModal } from "@/hooks/useModal";
import { Reservation } from "@/types/reservations";
import { cn } from "@/utils/cn";

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const isPC = useMediaQuery(MEDIA_QUERY.PC);
  const reservationReviewModal = useModal();
  const reservationDeleteModal = useModal();
  const badge = RESERVATION_STATUS_BADGES[reservation.status] || RESERVATION_STATUS_BADGES.pending;

  const handleOpenReservationReviewModal = () => {
    reservationReviewModal.onOpen();
  };
  const handleOpenReservationDeleteModal = () => {
    reservationDeleteModal.onOpen();
  };

  const handleCloseReservationReviewModal = () => {
    reservationReviewModal.onClose();
  };
  const handleCloseReservationDeleteModal = () => {
    reservationDeleteModal.onClose();
  };

  const renderAction = () => {
    const { status, reviewSubmitted } = reservation;

    const commonClass = !isPC ? "h-11 w-full" : "h-8 w-24";
    const typoClass = "typo-14-m rounded-lg";

    // 후기 작성 완료 상태
    if (status === "completed" && reviewSubmitted) {
      return (
        <div
          className={cn(
            typoClass,
            "flex cursor-not-allowed items-center justify-center bg-gray-50 text-gray-400",
            commonClass,
          )}
        >
          후기 작성 완료
        </div>
      );
    }

    // 후기 작성 가능 상태
    if (status === "completed" && !reviewSubmitted) {
      return (
        <Button onClick={handleOpenReservationReviewModal} className={cn(typoClass, commonClass)}>
          후기 작성
        </Button>
      );
    }

    // 예약 취소 가능 상태
    if (status === "pending") {
      return (
        <Button
          onClick={handleOpenReservationDeleteModal}
          className={cn(typoClass, "bg-gray-50 text-gray-600 hover:bg-gray-100", commonClass)}
        >
          예약 취소
        </Button>
      );
    }

    return null;
  };
  return (
    <div className={cn("w-full max-w-160", { "border-t border-t-gray-50 pt-5": !isPC })}>
      {!isPC && (
        <h1 className="typo-16-b mb-3 px-2 text-gray-800">
          {new Date(reservation.date).toLocaleDateString("ko-KR")}
        </h1>
      )}
      <div
        className={cn(
          "relative mb-4 h-34 max-w-160 p-6",
          "rounded-3xl shadow-[0_4px_20px_0_rgba(156,180,202,0.2)]",
          "lg:mb-0 lg:h-45 lg:rounded-4xl",
        )}
      >
        <div className="absolute inset-0 -right-1 overflow-hidden rounded-3xl lg:rounded-4xl">
          <CustomImage
            src={reservation.activity.bannerImageUrl}
            alt={reservation.activity.title}
            fill
            className="object-cover"
          />
        </div>

        <div
          className={cn(
            "absolute top-0 -left-1 flex h-34 w-4/5 flex-col items-start justify-start p-5",
            "rounded-3xl bg-white shadow-[0_-8px_15px_0_rgba(0,0,0,0.05)]",
            "lg:h-45 lg:rounded-4xl lg:px-10 lg:py-7.5",
          )}
        >
          <div
            className={cn(
              "typo-13-b mb-2 flex h-6 w-fit items-center justify-center rounded-4xl px-3 lg:mb-3",
              badge.bgColor,
              badge.textColor,
            )}
          >
            {badge.label}
          </div>
          <h2 className="typo-14-b lg:typo-18-b mb-1 line-clamp-1 lg:mb-2.5">
            {reservation.activity.title}
          </h2>
          <p className="typo-13-m lg:typo-16-m mb-2 text-gray-500">
            {reservation.startTime} - {reservation.endTime}
          </p>
          <div className="flex w-full items-center justify-between">
            <p className="typo-16-b lg:typo-18-b">
              ₩{reservation.totalPrice.toLocaleString()}{" "}
              <span className="typo-14-m lg:typo-16-m text-gray-400">
                {reservation.headCount}명
              </span>
            </p>
            {isPC && renderAction()}
          </div>
        </div>
      </div>
      {!isPC && <div className="mt-4 flex justify-center">{renderAction()}</div>}

      {reservationReviewModal.isOpen && (
        <ReservationReviewModal
          isOpen={!!reservationReviewModal.isOpen}
          onClose={handleCloseReservationReviewModal}
          reservationDetail={reservation}
        />
      )}

      {reservationDeleteModal.isOpen && (
        <ReservationDeleteModal
          isOpen={!!reservationDeleteModal.isOpen}
          onClose={handleCloseReservationDeleteModal}
          reservationId={reservation.id}
        />
      )}
    </div>
  );
};

export default ReservationCard;
