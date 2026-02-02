import Button from "@/components/common/Button";

const InvalidPasswordModal = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="typo-16-b md:typo-18-b text-black">비밀번호가 일치하지 않습니다.</div>
      <Button className="h-10.25 w-45 md:h-11.75 md:w-50">확인</Button>
    </div>
  );
};

export default InvalidPasswordModal;
