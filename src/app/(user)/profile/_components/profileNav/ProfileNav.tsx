"use client";

import clsx from "clsx";
import Image from "next/image";

import { useProfileNavLogic } from "../../_hooks/useProfileNavLogic";

import NavItem from "./NavItem";

import EditSvg from "@/assets/svg/EditSvg";
import { MEDIA_QUERY } from "@/constants/mediaQurery";
import { PROFILE_SIDE_MENU } from "@/constants/profileSideMenu";

const ProfileNav = () => {
  const { shouldHide, isActive } = useProfileNavLogic(MEDIA_QUERY.MOBILE);

  if (shouldHide) return null;

  return (
    <nav
      className="mx-6 mt-7.5 rounded-xl border border-gray-50 px-3.5 py-6
        shadow-[0_4px_24px_0_rgba(156,180,202,0.2)] md:w-44.5 lg:w-72.5"
    >
      <div className="mb-6 flex items-center justify-center md:mb-3 lg:mb-6">
        <div className="relative size-30 overflow-hidden md:size-17.5 lg:size-30">
          <Image src="/image/profile.png" fill className="object-cover" alt="사용자 프로필" />
          <div
            className="absolute right-0.5 bottom-1 flex size-7.5 items-center justify-center
              rounded-full bg-gray-300 text-white md:right-0 md:bottom-0 md:size-6 lg:size-7.5"
          >
            <EditSvg className="size-4 md:size-[12.8px] lg:size-4" />
          </div>
        </div>
      </div>

      <ul className="typo-16-m flex flex-col gap-3.5 text-gray-600 md:gap-3 lg:gap-3.5">
        {PROFILE_SIDE_MENU.map(({ href, label, Icon }) => {
          return (
            <NavItem key={label} href={href} isActive={isActive(href)}>
              <Icon className={clsx("md:size-5 lg:size-6", isActive(href) && "text-primary-500")} />
              <div>{label}</div>
            </NavItem>
          );
        })}
      </ul>
    </nav>
  );
};

export default ProfileNav;
