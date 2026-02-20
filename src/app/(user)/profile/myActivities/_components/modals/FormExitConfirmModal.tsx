import Image from "next/image";

import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";

interface FormExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onBackgroundClick?: () => void;
}

const FormExitConfirmModal = ({
  isOpen,
  onClose: handleClose,
  onConfirm: handleConfirm,
  onBackgroundClick: handleBackgroundClick,
}: FormExitConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      onBackgroundClick={handleBackgroundClick}
      containerClassName="h-54 w-80 md:h-71.5 md:w-100 m-5"
    >
      <div className="flex h-full flex-col items-center justify-center px-11">
        <Image
          src="/image/warning.png"
          alt="경고"
          height={50}
          width={50}
          className="mb-2 h-12.5 w-12.5 md:h-22 md:w-22"
        />
        <div className="typo-18-b md:typo-20-b mb-4 text-center md:mb-6">
          <p className="mb-2">작성 중인 내용이 있습니다.</p>
          <p>정말 나가시겠습니까?</p>
        </div>
        <div className="flex w-full gap-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="typo-14-m md:typo-16-m h-10 flex-1 md:h-12"
          >
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            variant="primary"
            className="typo-14-m md:typo-16-m h-10 flex-1 md:h-12"
          >
            나가기
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FormExitConfirmModal;
