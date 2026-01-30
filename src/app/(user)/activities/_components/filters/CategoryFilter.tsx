import CategoryBadge from "../common/CategoryBadge";

import BusSvg from "@/assets/svg/BusSvg";
import FoodSvg from "@/assets/svg/FoodSvg";
import MusicSvg from "@/assets/svg/MusicSvg";
import TourSvg from "@/assets/svg/TourSvg";
import WellbeingSvg from "@/assets/svg/WellbeingSvg";

const CategoryFilter = () => {
  return (
    <div className="mb-6 overflow-x-auto md:mb-7.5">
      <div className="scrollbar-hide flex w-max gap-2 px-1.5 md:gap-5">
        <CategoryBadge>
          <MusicSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" /> 문화 · 예술
        </CategoryBadge>
        <CategoryBadge>
          <FoodSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" /> 식음료
        </CategoryBadge>
        <CategoryBadge>
          <TourSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" /> 투어
        </CategoryBadge>
        <CategoryBadge>
          <BusSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" /> 관광
        </CategoryBadge>
        <CategoryBadge>
          <WellbeingSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" /> 웰빙
        </CategoryBadge>
      </div>
    </div>
  );
};

export default CategoryFilter;
