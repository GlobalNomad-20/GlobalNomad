"use client";

import { SkeletonLine } from "./SkeletonBox";

const DetailReservationBarSkeleton = () => {
  return (
    <div
      className="py flex h-31 w-full flex-col justify-center gap-3 border-t border-[#E6E6E6]
        bg-white px-6 py-4.5"
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-1.5">
          <SkeletonLine className="h-6 w-28" />
        </div>
        <SkeletonLine className="h-5 w-36" />
      </div>
      <SkeletonLine className="h-12.5 w-full rounded-2xl" />
    </div>
  );
};

export default DetailReservationBarSkeleton;
