"use client";

import { useState } from "react";

import StarRating from "./StarRating";
import ReviewTextarea from "./ReviewTextarea";
import ReservationReviewCompleteModal from "./ReservationReviewCompleteModal";

import DeleteSvg from "@/assets/svg/DeleteSvg";
import Button from "@/components/common/Button";
import { formatReservationDisplay } from "@/utils/date";
import Modal from "@/components/common/Modal";
import { Reservation } from "@/types/reservations";
import { cn } from "@/utils/cn";
import { useCreateReservationReview } from "@/hooks/queries/useReservations";

interface ReservationReviewModalProps {
  reservationDetail: Reservation;
  isOpen: boolean;
  onClose: () => void;
  onBackgroundClick?: () => void;
}

const ReservationReviewModal = ({
  reservationDetail,
  isOpen,
  onClose: handleClose,
  onBackgroundClick: handleBackgroundClick,
}: ReservationReviewModalProps) => {
  const { mutate: createReservationReview, isPending } = useCreateReservationReview();
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

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
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (content.trim() === "") {
      alert("후기를 작성해주세요.");
      return;
    }

    const reviewData = {
      rating,
      content: content.trim(),
    };

    createReservationReview(
      { reservationId: reservationDetail.id, reviewData },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: () => {
          alert("리뷰 작성 중 오류가 발생했습니다.");
        },
      },
    );
  };

  const startDateStr = `${reservationDetail.date}T${reservationDetail.startTime}`;
  const endDateStr = `${reservationDetail.date}T${reservationDetail.endTime}`;
  const scheduleText = formatReservationDisplay(startDateStr, endDateStr);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleSafeClose}
      onBackgroundClick={handleSafeBackgroundClick}
      containerClassName={cn("h-120 w-82 md:h-136 md:w-96 m-5", { "h-70 md:h-80": isSuccess })}
    >
      {isSuccess ? (
        <ReservationReviewCompleteModal onClose={handleClose} />
      ) : (
        <div
          className="relative flex h-full flex-col items-center justify-between px-6 py-5 md:px-7.5
            md:py-6"
        >
          <button
            type="button"
            onClick={handleSafeClose}
            className="absolute top-4 right-4 block text-gray-500"
            aria-label="닫기"
          >
            <DeleteSvg className="text-black" />
          </button>
          <div>
            <div className="mt-7 mb-3.5 flex flex-col items-center justify-between gap-1.5">
              <h2 className="typo-14-b md:typo-16-b">{reservationDetail.activity.title}</h2>
              <h3 className="typo-13-m md:typo-14-m text-gray-500">
                {scheduleText}({reservationDetail.headCount}명)
              </h3>
            </div>
            <StarRating rating={rating} onRatingChange={handleRatingChange} disabled={isPending} />
          </div>
          <h1 className="typo-16-b md:typo-18-b mb-3 w-full text-left md:mb-4">
            소중한 경험을 들려주세요
          </h1>
          <ReviewTextarea value={content} onChange={handleContentChange} disabled={isPending} />
          <Button
            onClick={handleRequest}
            disabled={isPending || rating === 0 || content.trim() === ""}
            className="typo-14-m md:typo-16-m h-10 w-full disabled:cursor-not-allowed
              disabled:bg-gray-50 disabled:text-gray-400 md:h-12"
          >
            {isPending ? "작성 중..." : "작성하기"}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ReservationReviewModal;
