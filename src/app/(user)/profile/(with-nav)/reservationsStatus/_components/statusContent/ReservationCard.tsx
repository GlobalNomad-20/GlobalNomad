import { ActivityReservation } from "@/types/myActivities";
import { ReservationStatus } from "@/types/reservations";

interface ReservationCardProps {
  reservation: ActivityReservation;
  status: ReservationStatus;
}

const ReservationCard = ({ reservation, status }: ReservationCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-800">닉네임: {reservation.nickname}</p>
        <p className="text-sm text-gray-600">인원: {reservation.headCount}명</p>
      </div>
      {status === "pending" && (
        <div className="mt-3 flex gap-2">
          <button className="">승인하기</button>
          <button className="">거절하기</button>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
