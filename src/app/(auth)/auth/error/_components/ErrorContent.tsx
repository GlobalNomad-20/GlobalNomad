"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/common/Button";

interface ErrorContentProps {
  message: string | undefined;
}

const ErrorContent = ({ message }: ErrorContentProps) => {
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
      <h1 className="typo-32-b">인증 에러</h1>
      <p className="typo-20-body-b mb-4">{message}</p>
      <Button onClick={handleBack} className="w-36">
        이전으로
      </Button>
    </div>
  );
};

export { ErrorContent };
