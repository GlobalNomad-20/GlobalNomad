import CategoryBadge from "../common/CategoryBadge";

import { CATEGORY_BADGES } from "@/constants/categortBadgeItem";

// interface CategoryFilterProps {
//   setCategory: (value: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙") => void;
// }
const CategoryFilter = () => {
  return (
    <div className="mb-6 overflow-x-auto md:mb-7.5">
      <div className="scrollbar-hide flex w-max gap-2 px-1.5 md:gap-5">
        {CATEGORY_BADGES.map((item) => {
          return <CategoryBadge key={item.key} value={item.value} icon={item.icon} />;
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
