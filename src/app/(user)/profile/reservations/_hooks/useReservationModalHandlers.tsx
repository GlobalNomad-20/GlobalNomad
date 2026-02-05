import ReservationReviewModal from "../_components/modal/ReservationReviewModal";
import ReservationDeleteCompleteModal from "../_components/modal/ReservationDeleteCompleteModal";
import ReservationDeleteModal from "../_components/modal/ReservationDeleteModal";
import ReservationReviewCompleteModal from "../_components/modal/ReservationReviewCompleteModal";

import { useCloseModal, useOpenModal } from "@/store/useModalStore";
import { Reservation } from "@/types/reservations";

export const useReservationModalHandlers = () => {
  const openModal = useOpenModal();
  const closeModal = useCloseModal();

  // 모달 닫기 공통 핸들러
  const handleCloseModal = () => {
    closeModal();
  };

  // 리뷰 작성 완료 모달 핸들러
  const handleReviewCompleteOpenModal = () => {
    openModal({
      position: "center",
      containerClassName: "h-46 w-80 md:h-60.5 md:w-100 m-5",
      children: <ReservationReviewCompleteModal onClose={handleCloseModal} />,
      onBackgroundClose: handleCloseModal,
    });
  };

  // 리뷰 작성 모달 핸들러
  const handleReviewOpenModal = (reservation: Reservation) => {
    openModal({
      position: "center",
      containerClassName: "h-120 w-82 md:h-60.5 md:w-100 m-5",
      children: (
        <ReservationReviewModal
          reservationDetail={{
            id: reservation.id,
            title: reservation.activity.title,
            date: reservation.date,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            headCount: reservation.headCount,
          }}
          onCancel={handleCloseModal}
          onSuccess={handleReviewCompleteOpenModal}
        />
      ),
    });
  };

  // 예약 내역 취소 완료 모달 핸들러
  const handleDeleteCompleteOpenModal = () => {
    openModal({
      position: "center",
      containerClassName: "h-46 w-80 md:h-60.5 md:w-100 m-5",
      children: <ReservationDeleteCompleteModal onClose={handleCloseModal} />,
      onBackgroundClose: handleCloseModal,
    });
  };

  // 예약 내역 취소 모달 핸들러
  const handleDeleteOpenModal = (reservationId: number) => {
    openModal({
      position: "center",
      containerClassName: "h-46 w-80 md:h-60.5 md:w-100 m-5",
      children: (
        <ReservationDeleteModal
          reservationId={reservationId}
          onCancel={handleCloseModal}
          onSuccess={handleDeleteCompleteOpenModal}
        />
      ),
      onBackgroundClose: handleCloseModal,
    });
  };

  return {
    handleDeleteOpenModal,
    handleReviewOpenModal,
  };
};
