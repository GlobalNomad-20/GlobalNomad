import Button from "@/components/common/Button";

interface OKModalProps {
  message: string;
  closeModal: () => void;
}

const OKModal = ({ message, closeModal: handleCloseModal }: OKModalProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="typo-16-b md:typo-18-b text-black">{message}</div>
      <Button type="button" onClick={handleCloseModal} className="h-10.25 w-45 md:h-11.75 md:w-50">
        확인
      </Button>
    </div>
  );
};

export default OKModal;
