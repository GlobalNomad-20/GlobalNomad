"use client";

import { SkeletonLine } from "./SkeletonBox";

import StarSvg from "@/assets/svg/StarSvg";

export const ReviewCardSkeleton = () => {
  return (
    <div className="w-full rounded-3xl bg-white p-5 shadow-[0px_4px_24px_0px_rgba(156,180,202,0.2)]">
      <div className="mb-1 flex gap-2">
        <SkeletonLine className="h-4 w-24 md:h-5 md:w-28" />
        <SkeletonLine className="h-4 w-20 md:h-5 md:w-24" />
      </div>
      <div className="mb-2 flex gap-0.5 md:mb-3">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <div key={i} className="opacity-30">
              <StarSvg className="h-4 w-4" />
            </div>
          );
        })}
      </div>
      <div className="space-y-2">
        <SkeletonLine className="h-4 w-full md:h-5" />
        <SkeletonLine className="h-4 w-[92%] md:h-5" />
        <SkeletonLine className="h-4 w-[70%] md:h-5" />
      </div>
    </div>
  );
};

export const ReviewListSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="w-81.75 md:w-171 lg:w-167.5">
      <div className="mb-2 flex items-center justify-start gap-2">
        <div className="typo-16-b md:typo-18-b text-gray-950">체험 후기</div>
      </div>
      <div className="mb-7.5 flex flex-col items-center">
        <div className="typo-24-b md:typo-32-b mb-0.5 text-gray-950">
          <SkeletonLine className="h-7 w-7 md:h-8 md:w-8" />
        </div>
        <div className="typo-14-b md:typo-16-b mb-1.5 text-gray-950">
          <SkeletonLine className="h-4 w-7 md:h-5 md:w-8" />
        </div>
        <div className="flex items-center gap-0.5">
          <StarSvg className="h-4 w-4" />
          <div className="typo-14-m text-[#79747E]">0개 후기</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 md:gap-5">
        {Array.from({ length: count }).map((_, i) => {
          return <ReviewCardSkeleton key={i} />;
        })}
      </div>
      <div className="mt-7.5 flex flex-col items-center md:mt-10 lg:mt-7.5"></div>
    </div>
  );
};
