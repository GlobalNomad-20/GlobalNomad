import Image from "next/image";
import Link from "next/link";

import UserAuthNav from "./UserAuthNav";

import { ROUTES } from "@/constants/routes";

const Header = () => {
  const isLogin = true;

  return (
    <header className="h-12 px-6 md:h-20 md:px-7.5">
      <div className="mx-auto flex h-full max-w-380 items-center justify-between">
        <h1 className="relative size-7 overflow-hidden md:w-43.5">
          <Link href={ROUTES.ACTIVITIES.ROOT}>
            <Image
              src="/image/smLogo.png"
              fill
              className="object-cover object-left"
              alt="로고 이미지"
            />
          </Link>
        </h1>
        <UserAuthNav isLogin={isLogin} userName="김지훈" profileImage="/image/profile.png" />
      </div>
    </header>
  );
};

export default Header;
