"use client";

import { useState } from "react";

import useActivities from "../../_hooks/useActivities";
import ActivityCard from "../common/ActivityCard";
import DropdownOption from "../common/DropdownOption";
import CategoryFilter from "../filters/CategoryFilter";

const ActivityBrowseSection = () => {
  //   const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string>("latest");

  const { data } = useActivities({
    category: undefined,
    keyword: undefined,
    sort: sort,
    page: 1,
    size: 20,
  });

  return (
    <div className="mt-10 w-82 md:mt-20 md:w-171 lg:w-280">
      <div className="mb-2.5 flex justify-between md:mb-[17px] lg:mb-5">
        <div className="typo-18-b md:typo-32-b leading-[26px] md:leading-[32px]">🛼 모든 체험</div>
        <DropdownOption setSort={setSort} />
      </div>
      <CategoryFilter />
      <div
        className="mb-6 grid grid-cols-2 gap-[18px] md:mb-7.5 md:grid-cols-2 md:gap-[20px]
          lg:grid-cols-4 lg:gap-[24px]"
      >
        {data?.activities.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} />;
        })}
      </div>
      <div className="flex justify-center">
        <div>페이지네이션</div>
      </div>
    </div>
  );
};

export default ActivityBrowseSection;
