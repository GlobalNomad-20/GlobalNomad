"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";

const withAuth = <P extends object>(Wrapped: React.ComponentType<P>) => {
  const AuthComponent = (props: P) => {
    const user = useAuthStore((s) => {
      return s.user;
    });
    const navigation = useRouter();

    useEffect(() => {
      if (!user) navigation.push(ROUTES.AUTH.LOGIN);
    }, [user, navigation]);

    return <Wrapped {...props} />;
  };
  return AuthComponent;
};

export default withAuth;
