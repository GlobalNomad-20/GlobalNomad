"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";

export const useProfileNavLogic = (query: string) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery(query);

  const shouldHide = useMemo(() => {
    return isMobile && pathname !== "/profile";
  }, [isMobile, pathname]);

  const isActive = useMemo(() => {
    return (href: string) => {
      return pathname === href || pathname.startsWith(`${href}/`);
    };
  }, [pathname]);

  return { shouldHide, isMobile, pathname, isActive };
};
