import WarningSvg from "@/assets/svg/WarningSvg";
import Button from "@/components/common/Button";

interface ReservationSuccessModalProps {
  onClose: () => void;
}

const ExistingReservationModal = ({ onClose: handleCloseModal }: ReservationSuccessModalProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <div>
        <WarningSvg className="h-12.25 w-12.25 md:h-22 md:w-22" />
      </div>
      <p className="typo-16-b md:typo-18-b mb-3 text-center leading-normal">
        선택하신 시간에는 기존 예약이 있습니다.
        <br />
        시간 변경 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-3">
        <Button
          onClick={handleCloseModal}
          className="typo-14-b md:typo-16-b h-10.25 w-45 md:h-11.75 md:w-50"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default ExistingReservationModal;
