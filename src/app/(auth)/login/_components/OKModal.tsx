import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

interface OKModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackgroundClose?: () => void;
  message: string;
}

const OKModal = ({ isOpen, onClose: handleClose, onBackgroundClose, message }: OKModalProps) => {
  const handleBackgroundClick = onBackgroundClose ?? handleClose;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onBackgroundClick={handleBackgroundClick}
      containerClassName="max-h-35 md:max-h-42.5 max-w-80 md:max-w-100"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <div className="typo-16-b md:typo-18-b text-black">{message}</div>
        <Button type="button" onClick={handleClose} className="h-10.25 w-45 md:h-11.75 md:w-50">
          확인
        </Button>
      </div>
    </Modal>
  );
};

export default OKModal;
