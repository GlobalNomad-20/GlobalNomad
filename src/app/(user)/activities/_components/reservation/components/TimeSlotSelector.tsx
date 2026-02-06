import Button from "@/components/common/Button";

const TimeSlotSelector = () => {
  return (
    <div className="flex flex-col gap-1.25">
      <div className="typo-16-b text-gray-950">예약 가능한 시간</div>
      <div className="py-2.25">
        <Button
          variant="outline"
          className="hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
            hover:typo-16-b h-12.75 w-87.5 hover:border-2 active:bg-sky-200"
        >
          14:00~15:00
        </Button>
      </div>
    </div>
  );
};

export default TimeSlotSelector;
