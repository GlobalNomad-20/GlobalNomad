import Button from "@/components/common/Button";

interface LoginErrorModalProps {
  onClose: () => void;
  onComplete: () => void;
}

const LoginErrorModal = ({
  onClose: handleCloseModal,
  onComplete: LinkLoginPage,
}: LoginErrorModalProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <p className="typo-18-b mb-4 md:mb-5">로그인이 필요합니다.</p>
      <div className="flex gap-3">
        <Button
          onClick={handleCloseModal}
          className="typo-14-b md:typo-16-b h-10.25 w-28.25 md:h-11.75 md:w-33.75"
          variant="outline"
        >
          닫기
        </Button>
        <Button
          // eslint-disable-next-line react/jsx-handler-names
          onClick={LinkLoginPage}
          className="typo-14-b md:typo-16-b h-10.25 w-28.25 md:h-11.75 md:w-33.75"
        >
          로그인하기
        </Button>
      </div>
    </div>
  );
};

export default LoginErrorModal;
