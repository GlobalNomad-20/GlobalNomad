/* eslint-disable react/jsx-handler-names */
import GuestSelector from "../../reservation/components/GuestSelector";
import TimeSelector from "../../reservation/components/TimeSelector";

import Button from "@/components/common/Button";

interface ReservationModalProps {
  onCancel: () => void;
  onComplete: () => void;
}

const ReservationModal = ({ onCancel, onComplete }: ReservationModalProps) => {
  return (
    <div className="flex h-full flex-col p-6 md:px-7.5">
      <p className="typo-18-b md:typo-20-b mb-2 text-gray-950 md:mb-6">날짜</p>
      <GuestSelector />
      <TimeSelector />
      <div className="flex gap-3">
        <Button onClick={onCancel} variant="outline">
          아니오
        </Button>
        <Button onClick={onComplete}>실행하기</Button>
      </div>
    </div>
  );
};

export default ReservationModal;
