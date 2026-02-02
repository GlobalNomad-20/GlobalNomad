import Image from "next/image";

import ActivityBrowseSection from "./_components/sections/ActivityBrowseSection";
import PopularActivitySection from "./_components/sections/PopularActivitySection";
import SearchSection from "./_components/sections/SearchSection";

import BannerSection from "@/app/(user)/activities/_components/sections/BannerSection";
const Activities = () => {
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
        className="ju relative z-20 -mt-[800px] flex flex-col items-center pt-[74px] pb-34
          md:-mt-[1400px] md:pt-[103px] md:pb-[204px] lg:pb-[218px]"
      >
        <BannerSection />
        <SearchSection />
        <PopularActivitySection />
        <ActivityBrowseSection />
      </div>
    </div>
  );
};

export default Activities;
