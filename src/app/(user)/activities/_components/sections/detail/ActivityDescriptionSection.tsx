"use client";

import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ActivityDescriptionSectionProps {
  data?: ActivityDetailResponse;
}

const ActivityDescriptionSection = ({ data }: ActivityDescriptionSectionProps) => {
  return (
    <div className="flex w-81.75 flex-col gap-2 md:w-171 md:gap-3.5 lg:w-167.5 lg:gap-2">
      <div className="typo-16-b md:typo-18-b text-gray-950">체험 설명</div>
      <div className="typo-16-m leading-[1.8] text-gray-950">{data?.description}</div>
    </div>
  );
};

export default ActivityDescriptionSection;
