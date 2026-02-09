"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ROUTES } from "@/constants/routes";
import useAuthStore from "@/store/useAuthStore";

const useLogin = () => {
  const { isInitialized, isLoggedIn } = useAuthStore();
  const navigation = useRouter();

  useEffect(() => {
    if (!isInitialized) return;
    if (!isLoggedIn) navigation.push(ROUTES.AUTH.LOGIN);
  }, [isInitialized, isLoggedIn, navigation]);
};

export default useLogin;
