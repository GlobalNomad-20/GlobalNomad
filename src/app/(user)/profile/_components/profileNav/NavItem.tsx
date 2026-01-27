"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  children: ReactNode;
  href: string;
  isActive: boolean;
}

const NavItem = ({ children, href, isActive }: NavItemProps) => {
  return (
    <li>
      <Link
        href={href}
        className={clsx(
          "flex items-center gap-2 rounded-[14px] py-3.75 pl-5",
          isActive && "bg-primary-100",
        )}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavItem;
