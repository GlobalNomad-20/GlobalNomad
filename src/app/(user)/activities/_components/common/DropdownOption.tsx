"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

const DropdownOption = () => {
  const [showDropdown, setShopDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShopDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleClick = () => {
    return setShopDropdown((prev) => {
      return !prev;
    });
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button className="flex items-center gap-1.5 hover:cursor-pointer" onClick={handleClick}>
        <span>가격</span>
        <DropdownArrowSvg
          className={clsx("transition-transform duration-200", showDropdown && "rotate-180")}
        />
      </button>

      {showDropdown && (
        <ul
          className="absolute -right-2 z-20 w-30 overflow-hidden rounded-[18px] border
            border-gray-200 bg-white text-center shadow-md md:w-40"
        >
          <li className="cursor-pointer px-4 py-2 hover:bg-gray-50 md:py-4" onClick={handleClick}>
            가격 낮은 순
          </li>
          <li
            className="cursor-pointer border-t border-gray-100 px-4 py-2 hover:bg-gray-50 md:py-4"
            onClick={handleClick}
          >
            가격 높은 순
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownOption;
