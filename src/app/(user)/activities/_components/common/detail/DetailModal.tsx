import Button from "@/components/common/Button";

interface DetailModalProps {
  onClose: () => void;
}

const DetailModal = ({ onClose: handleCloseModal }: DetailModalProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <p className="typo-18-b mb-4 md:mb-5">예약이 완료되었습니다.</p>
      <div className="flex gap-3">
        <Button
          onClick={handleCloseModal}
          className="typo-14-b md:typo-16-b h-10.25 w-180 md:h-11.75 md:w-50"
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default DetailModal;
