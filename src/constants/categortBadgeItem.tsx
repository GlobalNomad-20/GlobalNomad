import BusSvg from "@/assets/svg/BusSvg";
import FoodSvg from "@/assets/svg/FoodSvg";
import MusicSvg from "@/assets/svg/MusicSvg";
import SportsSvg from "@/assets/svg/SportsSvg";
import TourSvg from "@/assets/svg/TourSvg";
import WellbeingSvg from "@/assets/svg/WellbeingSvg";

export const CATEGORY_BADGES = [
  {
    key: "culture",
    value: "문화 · 예술",
    icon: <MusicSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
  {
    key: "food",
    value: "식음료",
    icon: <FoodSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
  {
    key: "Sports",
    value: "스포츠",
    icon: <SportsSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
  {
    key: "tour",
    value: "투어",
    icon: <TourSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
  {
    key: "bus",
    value: "관광",
    icon: <BusSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
  {
    key: "wellbeing",
    value: "웰빙",
    icon: <WellbeingSvg className="h-3 w-3 hover:fill-white md:h-5 md:w-5" />,
  },
] as const;
