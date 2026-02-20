import { ActivityReservation, ActivityStatus } from "@/types/myActivities";

interface ReservationCardProps {
  reservation: ActivityReservation;
  status: ActivityStatus;
  isPending: boolean;
  onStatusChange: (status: "confirmed" | "declined") => void;
}

const ReservationCard = ({
  reservation,
  status,
  isPending,
  onStatusChange: handleStatusChange,
}: ReservationCardProps) => {
  return (
    <div
      className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4
        py-3.5 shadow-sm"
    >
      <div className="flex flex-col gap-2">
        <div className="typo-16-b lg:typo-16-b grid grid-cols-2 gap-2 text-gray-500">
          닉네임:{" "}
          <span className="typo-14-m lg:typo-16-m text-[#1B1B1B]">{reservation.nickname}</span>
        </div>
        <div className="typo-16-b lg:typo-16-b grid grid-cols-2 gap-2 text-gray-500">
          인원:{" "}
          <span className="typo-14-m lg:typo-16-m text-[#1B1B1B]">{reservation.headCount}명</span>
        </div>
      </div>
      {status === "pending" && (
        <div className="typo-14-m flex flex-col gap-2 text-gray-600">
          <button
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              return handleStatusChange("confirmed");
            }}
            disabled={isPending}
            className="hover:bg-gray-25 rounded-lg border border-gray-50 px-2.5 py-1.5
              transition-colors hover:cursor-pointer disabled:cursor-not-allowed
              disabled:opacity-50"
          >
            승인하기
          </button>
          <button
            // eslint-disable-next-line react/jsx-handler-names
            onClick={() => {
              return handleStatusChange("declined");
            }}
            disabled={isPending}
            className="rounded-lg border border-gray-50 bg-gray-50 px-2.5 py-1.5 transition-colors
              hover:cursor-pointer hover:bg-gray-100 disabled:cursor-not-allowed
              disabled:opacity-50"
          >
            거절하기
          </button>
        </div>
      )}
      {status === "confirmed" && (
        <div className="typo-13-b rounded-full bg-[#DDF9F9] px-3 py-1.5 text-[#1790A0]">
          예약 승인
        </div>
      )}
      {status === "declined" && (
        <div className="typo-13-b rounded-full bg-[#FCECEA] px-3 py-1.5 text-[#F96767]">
          예약 거절
        </div>
      )}
    </div>
  );
};

export default ReservationCard;
