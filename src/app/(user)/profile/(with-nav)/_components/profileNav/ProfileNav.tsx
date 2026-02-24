"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useProfileNavState } from "../../_hooks/useProfileNavState";

import NavItem from "./NavItem";
import ProfileImageUploader from "./ProfileImageUploader";

import LogOutSvg from "@/assets/svg/LogOutSvg";
import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { PROFILE_SIDE_MENU } from "@/constants/profileSideMenu";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/utils/cn";

const ProfileNav = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pathname, isMobile, shouldHideNav, isActive } = useProfileNavState(MEDIA_QUERY.MOBILE);
  const logout = useAuthStore((state) => {
    return state.logout;
  });

  useEffect(() => {
    if (isMobile === false && pathname === ROUTES.PROFILE.ROOT) {
      router.replace(ROUTES.PROFILE.EDIT);
    }
  }, [isMobile, pathname, router]);

  const handleLogout = () => {
    logout(queryClient);
    router.push(ROUTES.HOME);
  };

  if (shouldHideNav) return null;

  return (
    <div className={cn("mx-6 hidden pt-7.5 md:m-0 md:block md:pt-0", isMobile && "block")}>
      <nav
        className="shrink-0 rounded-xl border border-gray-50 px-3.5 py-6
          shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] md:w-44.5 lg:w-72.5"
      >
        <ProfileImageUploader />
        <ul className="typo-16-m flex flex-col gap-3.5 text-gray-600 md:gap-3 lg:gap-3.5">
          {PROFILE_SIDE_MENU.map(({ href, label, Icon }) => {
            return (
              <NavItem key={label} href={href} isActive={isActive(href)}>
                <Icon className={cn("md:size-5 lg:size-6", isActive(href) && "text-primary-500")} />
                <div>{label}</div>
              </NavItem>
            );
          })}
          <NavItem onClick={handleLogout} href="#" isActive={false}>
            <LogOutSvg />
            <div>로그아웃</div>
          </NavItem>
        </ul>
      </nav>
    </div>
  );
};

export default ProfileNav;
