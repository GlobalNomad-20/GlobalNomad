"use client";

import useActivities from "../../_hooks/useActivities";
import ActivityCard from "../common/ActivityCard";

const PopularActivitySection = () => {
  const { data } = useActivities({
    category: undefined,
    keyword: undefined,
    sort: undefined,
    page: 1,
    size: 20,
  });
  return (
    <div className="flex w-[327px] flex-col gap-3.5 md:w-171 md:gap-4 md:gap-5 lg:w-280">
      <div className="typo-18-b md:typo-32-b leading-[26px] md:leading-[32px]">🔥 인기 체험</div>
      <div className="d:gap-5 flex gap-3 lg:gap-6">
        {data?.activities.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} isSmall />;
        })}
      </div>
    </div>
  );
};

export default PopularActivitySection;
