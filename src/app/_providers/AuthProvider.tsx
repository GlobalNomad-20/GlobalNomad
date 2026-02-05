"use client";

import React, { useEffect } from "react";

import useAuthStore from "@/store/useAuthStore";

// useAuthStore의 초기화 함수 처리
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore((state) => {
    return state.initialize;
  });

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
};

export default AuthProvider;
