"use client";
import { useState } from "react";

import CategoryBadge from "../common/CategoryBadge";

import { CATEGORY_BADGES } from "@/constants/categortBadgeItem";
import { CategoryValue } from "@/types/activityCategory";

interface CategoryFilterProps {
  setCategory: (value: CategoryValue) => void;
}
const CategoryFilter = ({ setCategory }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryValue | undefined>(undefined);

  const handleClick = (value: CategoryValue) => {
    if (value === activeCategory) {
      setActiveCategory(undefined);
      setCategory(undefined);
    } else {
      setActiveCategory(value);
      setCategory(value);
    }
  };

  return (
    <div className="mb-6 overflow-x-auto md:mb-7.5">
      <div className="scrollbar-hide flex w-max gap-2 px-1.5 md:gap-5">
        {CATEGORY_BADGES.map((item) => {
          return (
            <CategoryBadge
              key={item.key}
              value={item.value}
              icon={item.icon}
              handleBadgeClick={() => {
                return handleClick(item.value);
              }}
              isActive={activeCategory === item.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
