interface ReservationStatusContentProps {
  activityId: number;
  date: string;
  onClose: () => void;
}

const ReservationStatusContent = ({
  activityId,
  date,
  onClose: handleClose,
}: ReservationStatusContentProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="typo-16-b text-gray-800">예약 상태 상세</h3>
      <p>Activity ID: {activityId}</p>
      <p>Date: {date}</p>
      <button onClick={handleClose} className="mt-4 rounded-md bg-blue-50 px-4 py-2 text-blue-600">
        닫기
      </button>
    </div>
  );
};

export default ReservationStatusContent;
