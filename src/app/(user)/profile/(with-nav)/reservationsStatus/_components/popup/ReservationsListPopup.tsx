import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

const ReservationsListPopup = ({}) => {
  return (
    <button
      className="mb-4 flex w-full items-center justify-between rounded-2xl border border-gray-100
        bg-white px-5 py-3.75 shadow-[0px_2px_6px_0px_#00000005] hover:cursor-pointer md:mb-6
        lg:mb-7.5"
    >
      <h4 className="typo-14-m md:typo-16-m">함께 배우면 즐거운 스트릿 댄스</h4>
      <DropdownArrowSvg />
    </button>
  );
};

export default ReservationsListPopup;
