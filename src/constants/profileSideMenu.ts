import type { ComponentType } from "react";

import CalenderSvg from "@/assets/svg/CalenderSvg";
import ListSvg from "@/assets/svg/ListSvg";
import SettingSvg from "@/assets/svg/SettingSvg";
import UserSvg from "@/assets/svg/UserSvg";
import { ROUTES } from "@/constants/routes";

export interface ProfileSideMenuItem {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

export const PROFILE_SIDE_MENU: ProfileSideMenuItem[] = [
  {
    label: "내 정보",
    href: ROUTES.PROFILE.EDIT,
    Icon: UserSvg,
  },
  {
    label: "예약 내역",
    href: ROUTES.PROFILE.RESERVATIONS,
    Icon: ListSvg,
  },
  {
    label: "내 체험 관리",
    href: ROUTES.PROFILE.MY_ACTIVITIES.ROOT,
    Icon: CalenderSvg,
  },
  {
    label: "예약 현황",
    href: ROUTES.PROFILE.RESERVATIONS_STATUS,
    Icon: SettingSvg,
  },
];
