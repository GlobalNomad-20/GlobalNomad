"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import BannerSection from "../_components/sections/main/BannerSection";
import SearchResultsSection from "../_components/sections/main/SearchResultsSection";
import SearchSection from "../_components/sections/main/SearchSection";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";

  return (
    <div className="bg-white">
      <section className="relative w-full overflow-hidden">
        <div
          className="absolute inset-0 z-0 h-200 bg-linear-to-b from-[#BBDDFF] via-[#F7FBFF] to-white
            md:h-350"
        />
        <div className="absolute top-0 left-0 z-10 h-35 w-full overflow-hidden md:h-70 lg:h-105">
          <div
            className="h-full w-full transform-gpu animate-[cloud-float_6s_ease-in-out_infinite]
              will-change-transform"
          >
            <div
              className="h-full w-full animate-[cloud-scroll_120s_linear_infinite]
                bg-[url('/image/cloud.svg')] bg-size-[var(--cloud-tile-w-scaled)_100%]
                bg-position-[0_100%] bg-repeat-x opacity-90 will-change-[background-position]"
            />
          </div>
        </div>
        <div
          className="relative z-20 mx-auto flex max-w-284 flex-col items-center px-4 pt-18.5 pb-34
            md:px-6 md:pt-25.75 md:pb-51 lg:pb-54.5"
        >
          <BannerSection />
          <SearchSection initialValue={keyword} />
          <Suspense fallback={<div>검색 결과 로딩 중...</div>}>
            <SearchResultsSection keyword={keyword} />
          </Suspense>
        </div>
        <div className="h-0 md:h-0" />
      </section>
    </div>
  );
};

export default SearchPage;
