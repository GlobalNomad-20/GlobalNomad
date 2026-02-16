import Button from "@/components/common/Button";
import { AvailableScheduleByDate } from "@/types/activityReservationSchedule";
import { cn } from "@/utils/cn";

interface TimeSelectorProps {
  schedules?: AvailableScheduleByDate[];
  selectedDate?: string;
  reservationTime: number | undefined;
  setReservationTime: (time: number | undefined) => void;
}

const TimeSelector = ({
  schedules,
  selectedDate,
  reservationTime,
  setReservationTime,
}: TimeSelectorProps) => {
  const selectedSchedule = schedules?.find((item) => {
    return item.date === selectedDate;
  });

  const activityTimes = selectedSchedule?.times;
  if (!activityTimes) {
    return (
      <div className="flex w-81.75 flex-col gap-3.5 md:w-63.25 lg:w-full">
        <div className="typo-16-b text-gray-950">예약 가능한 시간</div>
        <div
          className="max-h-auto typo-14-m flex w-full items-center justify-center text-gray-300
            md:max-h-60 lg:h-32.5"
        >
          해당 날짜에 예약 가능한 시간이 없습니다.
        </div>
      </div>
    );
  }

  const handleSelectedTime = (timeId: number) => {
    return () => {
      setReservationTime(reservationTime === timeId ? undefined : timeId);
    };
  };

  return (
    <div className="flex w-81.75 flex-col gap-3.5 md:w-63.25 lg:w-full">
      <div className="typo-16-b text-gray-950">예약 가능한 시간</div>
      <div
        className="max-h-auto w-full overflow-y-auto md:max-h-60 lg:h-32.5
          [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <div className="flex flex-col gap-3 pr-1">
          {activityTimes?.map((Time) => {
            const isSelected = reservationTime === Time.id;

            return (
              <Button
                key={Time.id}
                variant="outline"
                className={cn(
                  "h-12.75 w-full active:bg-sky-200",
                  `hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
                  hover:typo-16-b hover:border-2`,
                  isSelected &&
                    "border-primary-500 bg-primary-100 text-primary-500 typo-16-b border-2",
                )}
                onClick={handleSelectedTime(Time.id)}
              >
                {Time.startTime} ~ {Time.endTime}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
