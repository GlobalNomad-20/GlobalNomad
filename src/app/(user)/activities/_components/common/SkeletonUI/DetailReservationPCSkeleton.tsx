"use client";

import { SkeletonLine } from "./SkeletonBox";

const DetailReservationPCSkeleton = () => {
  return (
    <div
      className="mt-17 flex h-full flex-col gap-6 rounded-3xl border border-[#DDDDDD] bg-white p-7.5
        shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]"
    >
      <div className="flex items-center justify-start gap-1.25">
        <SkeletonLine className="h-7 w-44 md:h-8 md:w-52" />
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-4 w-24" />
        <SkeletonLine className="h-84 w-full rounded-2xl" />
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-4 w-24" />
        <SkeletonLine className="h-12.5 w-full rounded-2xl" />
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-4 w-24" />
        <div className="flex flex-col gap-2">
          <SkeletonLine className="h-12.5 w-full rounded-2xl" />
          <SkeletonLine className="h-12.5 w-full rounded-2xl" />
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[#DDDDDD] pt-5">
        <div className="flex items-center gap-1.5">
          <SkeletonLine className="h-6 w-20" />
          <SkeletonLine className="h-6 w-28" />
        </div>
        <SkeletonLine className="h-12.5 w-33.75 rounded-2xl" />
      </div>
    </div>
  );
};

export default DetailReservationPCSkeleton;
