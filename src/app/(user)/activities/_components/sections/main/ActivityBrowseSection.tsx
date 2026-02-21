"use client";

import Link from "next/link";
import { useState } from "react";

import useActivities from "../../../_hooks/useActivities";
import ActivityCard from "../../common/main/ActivityCard";
import DropdownOption from "../../common/main/DropdownOption";
import ActivityCardSkeletonList from "../../common/SkeletonUI/ActivityCardSkeletonList";
import CategoryFilter from "../../filters/CategoryFilter";

import Pagination from "@/app/(user)/_components/pagination/Pagination";
import DropdownArrowSvg from "@/assets/svg/DropdownArrowSvg";

// eslint-disable-next-line @typescript-eslint/naming-convention
const PAGE_LIMIT = 8;

const ActivityBrowseSection = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<string>("latest");
  const [page, setPage] = useState(1);

  const { data, isLoading, isPlaceholderData } = useActivities({
    category: category,
    keyword: undefined,
    sort: sort,
    page,
    size: PAGE_LIMIT,
  });

  const totalCount = data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

  const handlePage = (num: number) => {
    setPage(num);
  };

  if (isLoading) {
    return (
      <div className="mt-10 w-82 md:mt-20 md:w-171 lg:w-280">
        <div className="mb-2.5 flex justify-between md:mb-4.25 lg:mb-5">
          <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🛼 모든 체험</div>
          <div className="flex items-center gap-1.5">
            <span>가격</span>
            <DropdownArrowSvg />
          </div>
        </div>
        <div
          className="mb-6 grid grid-cols-2 gap-4.5 md:mb-7.5 md:grid-cols-2 md:gap-5 lg:grid-cols-4
            lg:gap-6"
        >
          <ActivityCardSkeletonList count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-82 md:mt-20 md:w-171 lg:w-280">
      <div className="mb-2.5 flex justify-between md:mb-4.25 lg:mb-5">
        <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🛼 모든 체험</div>
        <DropdownOption setSort={setSort} />
      </div>
      <CategoryFilter setCategory={setCategory} />
      <div
        className="mb-6 grid grid-cols-2 gap-4.5 md:mb-7.5 md:grid-cols-2 md:gap-5 lg:grid-cols-4
          lg:gap-6"
      >
        {data?.activities.map((activity) => {
          return (
            <Link key={activity.id} href={`/activities/${activity.id}`}>
              <ActivityCard key={activity.id} activity={activity} />
            </Link>
          );
        })}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePage}
        isPlaceholderData={isPlaceholderData}
      />
    </div>
  );
};

export default ActivityBrowseSection;
