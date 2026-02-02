"use client";

import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface NavItemProps {
  children: ReactNode;
  href: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ children, href, isActive, onClick }: NavItemProps) => {
  const handleOnClick = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <li onClick={handleOnClick}>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 rounded-[14px] py-3.75 pl-5 md:py-3.5 lg:py-3.75",
          isActive && "bg-primary-100 text-gray-950",
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
