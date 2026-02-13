/* eslint-disable react/jsx-handler-names */
import DateSelector from "../components/DateSelector";
import GuestSelector from "../components/GuestSelector";
import TimeSelector from "../components/TimeSelector";

import Button from "@/components/common/Button";

interface ReservationTabletProps {
  onComplete: () => void;
}

const ReservationTablet = ({ onComplete }: ReservationTabletProps) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="mt-6">
        <p className="md:typo-20-b mb-2 text-gray-950">날짜</p>
        <div className="flex gap-6">
          <div>
            <DateSelector />
          </div>
          <div
            className="flex h-110 flex-col justify-start gap-9 rounded-3xl bg-white p-6
              shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]"
          >
            <TimeSelector />
            <GuestSelector />
          </div>
        </div>
      </div>
      <Button className="bottom typo-16-b mb-5.25 w-full" onClick={onComplete}>
        확인
      </Button>
    </div>
  );
};

export default ReservationTablet;
