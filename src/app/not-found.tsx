"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";

const NotFound = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back(); // 이전 페이지로 이동
    } else {
      router.push("/"); // 기본 경로로 이동
    }
  };

  return (
    <div className="mx-2 flex h-screen flex-col items-center justify-center">
      <h1 className="typo-32-b mb-3">404 ERROR</h1>
      <p className="typo-16-m md:typo-18-m mb-4 text-center">
        지금 입력하신 주소의 페이지는 <br />
        사라졌거나 다른 페이지로 변경되었습니다. <br />
        주소를 다시 확인해주세요.
      </p>
      <Button onClick={handleBack} className="w-36">
        이전으로
      </Button>
    </div>
  );
};

export default NotFound;
