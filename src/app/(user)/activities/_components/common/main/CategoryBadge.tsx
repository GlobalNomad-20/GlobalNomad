"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CategoryBadgeProps {
  value: string;
  icon?: ReactNode;
  handleBadgeClick: () => void;
  isActive: boolean;
}

const CategoryBadge = ({ value, icon, handleBadgeClick, isActive }: CategoryBadgeProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleBadgeClick}
      className={clsx(
        `typo-14-m md:typo-16-b my-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-full
        border px-3.5 py-2.5 md:px-4 md:py-2.5`,
        isActive
          ? "bg-gray-800 text-white"
          : "border-gray-200 bg-white text-gray-950 hover:bg-gray-800 hover:text-white",
      )}
    >
      {icon}
      {value}
    </motion.div>
  );
};

export default CategoryBadge;
