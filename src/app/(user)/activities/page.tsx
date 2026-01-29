import Image from "next/image";

import ActivityCard from "@/app/(user)/activities/_components/ActivityCard";
import Banner from "@/app/(user)/activities/_components/Banner";
import SearchBar from "@/app/(user)/activities/_components/SearchBar";
import CategoryBadge from "@/app/(user)/activities/_components/CategoryBadge";
import MusicSvg from "@/assets/svg/MusicSvg";
import FoodSvg from "@/assets/svg/FoodSvg";
import TourSvg from "@/assets/svg/TourSvg";
import BusSvg from "@/assets/svg/BusSvg";
import WellbeingSvg from "@/assets/svg/WellbeingSvg";

const Activities = () => {
  return (
    <div className="bg-white">
      <div className="relative h-[800px] md:h-[1400px]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#BBDDFF] via-[#F7FBFF] to-white" />
        <div className="absolute top-0 left-0 z-10 h-35 w-full overflow-hidden md:h-70 lg:h-105">
          <Image
            src="/image/cloud.svg"
            alt="구름"
            fill
            className="absolute bottom-6 left-0 w-[200vw] max-w-none opacity-90 md:w-[1600px]"
          />
        </div>
      </div>
      <div
        className="ju relative z-20 -mt-[800px] flex flex-col items-center pt-[74px] pb-34
          md:-mt-[1400px] md:pt-[103px] md:pb-[204px] lg:pb-[218px]"
      >
        <Banner />
        <div
          className="justify-center·gap-3 mb-10 flex h-29 w-81.75 flex-col items-center md:mt-7.5
            md:mb-15 md:h-52 md:w-171 md:gap-9 lg:mt-12.5 lg:w-260"
        >
          <div className="typo-16-b md:typo-32-b mt-[33px] mb-3 text-gray-950">
            무엇을 체험하고 싶으신가요?
          </div>
          <SearchBar />
        </div>
        <div className="flex w-[327px] flex-col gap-3.5 md:w-171 md:gap-4 md:gap-5 lg:w-280">
          <div className="typo-18-b md:typo-32-b leading-[26px] md:leading-[32px]">
            🔥 인기 체험
          </div>
          <div className="d:gap-5 flex gap-3 lg:gap-6">
            <ActivityCard />
            <ActivityCard />
          </div>
        </div>
        <div className="mt-10 w-82 md:mt-20 md:w-171 lg:w-280">
          <div className="mb-2.5 flex justify-between md:mb-[17px] lg:mb-5">
            <div className="typo-18-b md:typo-32-b leading-[26px] md:leading-[32px]">
              🛼 모든 체험
            </div>
            <div>드롭다운 필터</div>
          </div>
          <div className="mb-6 flex gap-2 md:mb-7.5 md:gap-5">
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
          <div
            className="mb-6 grid grid-cols-2 gap-[18px] md:mb-7.5 md:grid-cols-2 md:gap-[20px]
              lg:grid-cols-4 lg:gap-[24px]"
          >
            <ActivityCard isSmall />
            <ActivityCard isSmall />
            <ActivityCard isSmall />
            <ActivityCard isSmall />
            <ActivityCard isSmall />
            <ActivityCard isSmall />
          </div>
          <div className="flex justify-center">
            <div>페이지네이션</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
