import Button from "@/components/common/Button";
import { AvailableScheduleByDate } from "@/types/activityReservationSchedule";

interface TimeSelectorProps {
  schedules?: AvailableScheduleByDate[];
  selectedDate?: string;
}

const TimeSelector = ({ schedules, selectedDate }: TimeSelectorProps) => {
  const selectedSchedule = schedules?.find((item) => {
    return item.date === selectedDate;
  });

  const activityTimes = selectedSchedule?.times;

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
            return (
              <Button
                key={Time.id}
                variant="outline"
                className="hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
                  hover:typo-16-b h-12.75 w-full hover:border-2 active:bg-sky-200"
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
