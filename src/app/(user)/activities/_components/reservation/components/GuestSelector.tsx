import MinusSvg from "@/assets/svg/MinusSvg";
import PlusSvg from "@/assets/svg/PlusSvg";

const GuestSelector = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="typo-16-b text-gray-950">참여 인원 수</div>
      <div
        className="inline-flex h-10 items-center justify-between gap-5.5 rounded-3xl border
          border-[#EEEEEE] bg-white px-4.75 py-2.5"
      >
        <MinusSvg className="h-3.25 w-3.25" />
        <div className="typo-16-b text-[##4B4B4B]">10</div>
        <PlusSvg className="h-3.25 w-3.25" />
      </div>
    </div>
  );
};

export default GuestSelector;
