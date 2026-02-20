import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

interface ReservationDeleteCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  onBackgroundClick?: () => void;
}

const ActivityConfirmModal = ({
  isOpen,
  onClose: handleClose,
  onBackgroundClick: handleBackgroundClick,
  message,
}: ReservationDeleteCompleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onBackgroundClick={handleBackgroundClick}
      containerClassName="h-35 w-80 md:h-42.5 md:w-100 m-5"
    >
      <div className="flex h-full flex-col items-center justify-center gap-5 md:gap-6">
        <div className="typo-16-b md:typo-18-b">{message}</div>
        <Button onClick={handleClose} className="typo-14-m md:typo-16-m h-10 w-45 md:h-12 md:w-50">
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default ActivityConfirmModal;
