"use client";

import React, { useEffect } from "react";

import useAuthStore from "@/store/useAuthStore";

// useAuthStore의 초기화 함수 처리
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAuthStore((state) => {
    return state.initialize;
  });
  const isInitialized = useAuthStore((state) => {
    return state.isInitialized;
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return (
      <div className="min-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }
  return <>{children}</>;
}
