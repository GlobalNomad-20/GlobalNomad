import Image from "next/image";
import { Suspense } from "react";

import BannerSection from "../_components/sections/BannerSection";
import SearchResultsSection from "../_components/sections/SearchResultsSection";
import SearchSection from "../_components/sections/SearchSection";

const SearchPage = () => {
  return (
    <div className="bg-white">
      <div className="relative h-200 md:h-350">
        <div className="absolute inset-0 z-0 bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF] to-white" />
        <div className="absolute top-0 left-0 z-10 h-35 w-full overflow-hidden md:h-70 lg:h-105">
          <Image
            src="/image/cloud.svg"
            alt="구름"
            fill
            className="absolute bottom-6 left-0 w-[200vw] max-w-none opacity-90 md:w-400"
          />
        </div>
      </div>
      <div
        className="relative z-20 -mt-200 flex flex-col items-center justify-center pt-18.5 pb-34
          md:-mt-350 md:pt-25.75 md:pb-51 lg:pb-54.5"
      >
        <BannerSection />
        <SearchSection />
        <Suspense fallback={<div>검색 결과 로딩 중...</div>}>
          <SearchResultsSection />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchPage;
