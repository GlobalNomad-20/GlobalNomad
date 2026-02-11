"use client";

import { useEffect, useRef, useState } from "react";

import KebabMenuSvg from "@/assets/svg/KebabMenuSvg";

const KebabDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleToggleDropdown = () => {
    setShowDropdown((prev) => {
      return !prev;
    });
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button className="flex h-7 w-7 items-center justify-center" onClick={handleToggleDropdown}>
        <KebabMenuSvg className="h-4 w-1 cursor-pointer hover:text-gray-600" />
      </button>
      {showDropdown && (
        <ul
          className="typo-16-m absolute top-0 right-6 z-20 w-23.75 overflow-hidden rounded-lg border
            border-gray-200 bg-white text-center shadow-md"
        >
          <li className="cursor-pointer px-3.5 py-5 hover:bg-gray-50">수정하기</li>
          <li className="cursor-pointer border-t border-gray-100 px-3.5 py-5 hover:bg-gray-50">
            삭제하기
          </li>
        </ul>
      )}
    </div>
  );
};

export default KebabDropdown;
