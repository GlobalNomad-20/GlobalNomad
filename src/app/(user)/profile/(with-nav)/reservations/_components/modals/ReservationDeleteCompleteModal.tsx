import Button from "@/components/common/Button";

interface ReservationDeleteCompleteModalProps {
  onClose: () => void;
}

const ReservationDeleteCompleteModal = ({
  onClose: handleClose,
}: ReservationDeleteCompleteModalProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-between py-8 md:py-10">
      <div className="typo-16-b md:typo-18-b mt-8 md:mt-12">예약 취소가 완료되었습니다.</div>
      <Button
        onClick={handleClose}
        variant="outline"
        className="typo-14-m md:typo-16-m h-10 w-28 md:h-12 md:w-34"
      >
        닫기
      </Button>
    </div>
  );
};

export default ReservationDeleteCompleteModal;
