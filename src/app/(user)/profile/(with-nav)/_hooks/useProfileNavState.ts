"use client";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants/routes";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const useProfileNavState = (query: string) => {
  const pathname = usePathname();
  const isMobile = useMediaQuery(query);

  const shouldHideByRoute = ROUTES.PROFILE.HIDE_NAV_PREFIXES.some((prefix) => {
    return pathname.startsWith(prefix);
  });

  const shouldHideNav = (isMobile && pathname !== ROUTES.PROFILE.ROOT) || shouldHideByRoute;

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return {
    pathname,
    isMobile,
    shouldHideNav,
    isActive,
  };
};
