// ReservationActionButton.tsx
import Button from "@/components/common/Button";
import { cn } from "@/utils/cn";
import { Reservation } from "@/types/reservations";

interface Props {
  reservation: Reservation;
  isMobile?: boolean;
  onReviewOpen: (reservation: Reservation) => void;
  onDeleteOpen: (id: number) => void;
}

const ReservationActionButton = ({ reservation, isMobile, onReviewOpen, onDeleteOpen }: Props) => {
  const { status, reviewSubmitted } = reservation;

  const handleReviewOpenModalClick = () => {
    return onReviewOpen(reservation);
  };

  const handleDeleteOpenModalClick = () => {
    return onDeleteOpen(reservation.id);
  };

  const isCompleted = status === "completed";
  const isPending = status === "pending";

  if (isCompleted) {
    if (reviewSubmitted) {
      return (
        <div
          className={cn(
            "typo-14-m flex items-center justify-center rounded-lg bg-gray-50 text-gray-400",
            isMobile ? "h-11 w-full" : "h-8 w-24",
          )}
        >
          후기 작성 완료
        </div>
      );
    }
    return (
      <Button
        onClick={handleReviewOpenModalClick}
        className={cn("typo-14-m rounded-lg", isMobile ? "h-11 w-full" : "h-8 w-24")}
      >
        후기 작성
      </Button>
    );
  }

  if (isPending) {
    return (
      <Button
        onClick={handleDeleteOpenModalClick}
        className={cn(
          "typo-14-m rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100",
          isMobile ? "h-11 w-full" : "h-8 w-24",
        )}
      >
        예약 취소
      </Button>
    );
  }

  return null;
};

export default ReservationActionButton;
