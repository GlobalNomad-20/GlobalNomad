import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

const DropdownOption = () => {
  return (
    <div className="relative inline-block text-left">
      <button className="flex items-center gap-1.5">
        <span>가격</span>
        <DropdownArrowSvg />
      </button>

      {/* <ul
        className="absolute -right-2 z-20 w-30 overflow-hidden rounded-[18px] border border-gray-200
          bg-white text-center shadow-md md:w-40"
      >
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-50 md:py-4">가격 낮은 순</li>
        <li className="cursor-pointer border-t border-gray-100 px-4 py-2 hover:bg-gray-50 md:py-4">
          가격 높은 순
        </li>
      </ul> */}
    </div>
  );
};

export default DropdownOption;
