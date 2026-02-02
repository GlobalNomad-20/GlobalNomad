"use client";

import useActivities from "../../_hooks/useActivities";
import ActivityCard from "../common/ActivityCard";

const PopularActivitySection = () => {
  const { data } = useActivities({
    category: undefined,
    keyword: undefined,
    sort: "most_reviewed",
    page: 1,
    size: 20,
  });
  return (
    <div className="flex w-81.75 flex-col gap-3.5 md:w-171 md:gap-4 lg:w-280 lg:gap-5">
      <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🔥 인기 체험</div>
      <div className="d:gap-5 flex gap-3 lg:gap-6">
        {data?.activities.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} isSmall />;
        })}
      </div>
    </div>
  );
};

export default PopularActivitySection;
