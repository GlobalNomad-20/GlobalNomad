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
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="typo-32-b">404 ERROR</h1>
      <p className="typo-20-body-b mb-4">
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <Button onClick={handleBack} className="w-36">
        이전으로
      </Button>
    </div>
  );
};

export default NotFound;
