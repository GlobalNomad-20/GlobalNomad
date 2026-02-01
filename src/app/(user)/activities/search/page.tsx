import Image from "next/image";

import BannerSection from "../_components/sections/BannerSection";
import SearchResultsSection from "../_components/sections/SearchResultsSection";
import SearchSection from "../_components/sections/SearchSection";

const SearchPage = () => {
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
        <BannerSection />
        <SearchSection />
        <SearchResultsSection />
      </div>
    </div>
  );
};

export default SearchPage;
