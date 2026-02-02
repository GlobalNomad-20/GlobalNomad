"use client";

import { useSearchParams } from "next/navigation";

import useActivities from "../../_hooks/useActivities";
import ActivityCard from "../common/ActivityCard";

const SearchResultsSection = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") ?? "";

  const { data } = useActivities({
    category: undefined,
    keyword,
    sort: undefined,
    page: 1,
    size: 20,
  });

  return (
    <div className="flex w-82 flex-col gap-6 md:w-171 md:gap-7.5 lg:w-280">
      <div className="flex w-full flex-col gap-2.5">
        <div className="typo-18-m md:typo-24-m leading-none text-gray-950">
          <span className="typo-18-b md:typo-24-b">{keyword}</span>으로 검색한 결과입니다.
        </div>
        <div className="typo-14-m md:typo-18-m text-gray-700">
          총 {data?.totalCount ?? 0}개의 결과
        </div>
      </div>
      <div className="w-full">
        <div
          className="mb-6 grid grid-cols-2 gap-4.5 md:mb-7.5 md:grid-cols-2 md:gap-5 lg:grid-cols-4
            lg:gap-6"
        >
          {data?.activities.map((activity) => {
            return <ActivityCard key={activity.id} activity={activity} />;
          })}
        </div>
        <div className="flex justify-center">
          <div>페이지네이션</div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsSection;
