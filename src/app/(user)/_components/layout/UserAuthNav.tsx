"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AlertPopup from "../alertPopup/AlertPopup";

import { ROUTES } from "@/constants/routes";

interface Props {
  isLogin: boolean;
  userName?: string;
  profileImage?: string | null;
}

const UserAuthNav = ({ isLogin, userName, profileImage }: Props) => {
  const router = useRouter();
  const handleClickProfile = () => {
    const isMdUp = window.matchMedia("(min-width: 768px)").matches;
    router.push(isMdUp ? ROUTES.PROFILE.EDIT : ROUTES.PROFILE.ROOT);
  };

  if (!isLogin) {
    return (
      <nav className="typo-14-m">
        <div className="flex gap-6.75 md:gap-9.75">
          <Link href={ROUTES.AUTH.LOGIN}>로그인</Link>
          <Link className="pr-1.5 md:pr-2.5" href={ROUTES.AUTH.SIGNUP}>
            회원가입
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="typo-14-m">
      <div className="flex h-full items-center gap-5 px-4 py-2">
        <AlertPopup />
        <div className="h-3.5 w-px bg-gray-100" />
        <button
          type="button"
          onClick={handleClickProfile}
          className="flex items-center gap-2.5 hover:cursor-pointer"
        >
          <div className="relative size-7.5 overflow-hidden">
            <Image
              src={profileImage || "/image/profile.png"}
              fill
              className="object-cover object-left"
              alt="사용자 프로필 이미지"
            />
          </div>
          {userName}
        </button>
      </div>
    </nav>
  );
};

export default UserAuthNav;
