"use client";

import Image from "next/image";
import { useState } from "react";

import DeleteSvg from "@/assets/svg/DeleteSvg";
import Button from "@/components/common/Button";
import { formatReservationDisplay } from "@/utils/date";

interface ReservationReviewModalProps {
  reservationDetail: {
    id: number;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    headCount: number;
  };
  onCancel: () => void;
  onSuccess: () => void;
}

const starCount = 5;

const ReservationReviewModal = ({
  reservationDetail,
  onCancel: handleDeleteCancelModal,
}: ReservationReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarEnter = (starValue: number) => {
    setHoverRating(starValue);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const startDateStr = `${reservationDetail.date}T${reservationDetail.startTime}`;
  const endDateStr = `${reservationDetail.date}T${reservationDetail.endTime}`;
  const scheduleText = formatReservationDisplay(
    startDateStr,
    endDateStr,
    reservationDetail.headCount,
  );

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-5 md:gap-6">
      <button
        type="button"
        onClick={handleDeleteCancelModal}
        className="absolute top-4 right-4 text-gray-500"
        aria-label="닫기"
      >
        <DeleteSvg className="text-black" />
      </button>
      <h2 className="typo-14-b">{reservationDetail.title}</h2>
      <h3 className="typo-13-m text-gray-500">{scheduleText}</h3>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-1" role="group" aria-label="별점">
          {Array.from({ length: starCount }, (_, i) => {
            const starValue = i + 1;
            const isFilled = starValue <= displayRating;
            const handleStarButtonClick = () => {
              handleStarClick(starValue);
            };
            const handleStarButtonEnter = () => {
              handleStarEnter(starValue);
            };
            return (
              <button
                key={starValue}
                type="button"
                onClick={handleStarButtonClick}
                onMouseEnter={handleStarButtonEnter}
                onMouseLeave={handleStarLeave}
                className="p-0.5"
                aria-label={`${starValue}점`}
                aria-pressed={rating === starValue}
              >
                <Image
                  width={36}
                  height={36}
                  src={isFilled ? "/image/yellowStar.png" : "/image/grayStar.png"}
                  alt=""
                  className="h-9 w-9 md:h-10.5 md:w-10.5"
                />
              </button>
            );
          })}
        </div>
        <h1 className="typo-16-b md:typo-18-b">소중한 경험을 들려주세요</h1>
      </div>
      <textarea
        className="h-45 w-full rounded-xl border border-gray-100
          shadow-[0px_4px_24px_0px_#9CB4CA33]"
        placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
      />
      <p>0/100</p>
      <Button className="typo-14-m md:typo-16-m h-10 w-full md:h-12">작성하기</Button>
    </div>
  );
};

export default ReservationReviewModal;
