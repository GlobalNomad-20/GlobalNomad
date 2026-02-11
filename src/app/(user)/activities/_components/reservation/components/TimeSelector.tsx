import Button from "@/components/common/Button";

const TimeSelector = () => {
  return (
    <div className="flex w-81.75 flex-col gap-3.5 md:w-63.25 lg:w-full">
      <div className="typo-16-b text-gray-950">예약 가능한 시간</div>
      <div
        className="h-32.5 w-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300
          [&::-webkit-scrollbar-track]:bg-transparent"
      >
        <div className="flex flex-col gap-3 pr-1">
          <Button
            variant="outline"
            className="hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
              hover:typo-16-b h-12.75 w-full hover:border-2 active:bg-sky-200"
          >
            14:00~15:00
          </Button>
          <Button
            variant="outline"
            className="hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
              hover:typo-16-b h-12.75 w-full hover:border-2 active:bg-sky-200"
          >
            15:00~16:00
          </Button>
          <Button
            variant="outline"
            className="hover:border-primary-500 hover:bg-primary-100 hover:text-primary-500
              hover:typo-16-b h-12.75 w-full hover:border-2 active:bg-sky-200"
          >
            16:00~17:00
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;
