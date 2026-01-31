import { ReactNode } from "react";

type CategoryBadgeProps = {
  key: string;
  value: string;
  icon: ReactNode;
};

const CategoryBadge = ({ value, icon }: CategoryBadgeProps) => {
  return (
    <div
      className="typo-14-m md:typo-16-b inline-flex cursor-pointer items-center gap-1.5 rounded-full
        border border-gray-200 bg-white px-3.5 py-2.5 text-gray-950 hover:bg-gray-800
        hover:text-white active:bg-gray-900 md:px-4 md:py-2.5"
    >
      {icon}
      {value}
    </div>
  );
};

export default CategoryBadge;
