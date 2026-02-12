"use client";

import { cn } from "@/utils/cn";

const MyActivitySkeleton = () => {
  return (
    <div className="w-full">
      <div
        className={cn(
          "relative mb-4 h-45",
          "rounded-3xl shadow-[0_4px_20px_0_rgba(156,180,202,0.2)]",
          "h-39 p-6 lg:mb-6 lg:h-50 lg:p-7.5",
        )}
      >
        <div
          className="absolute right-6 h-20.5 w-20.5 animate-pulse rounded-3xl bg-gray-200
            lg:right-7.5 lg:h-35 lg:w-35 lg:rounded-4xl"
        />
        <div className="flex h-full flex-col justify-center">
          <div
            className="typo-16-b lg:typo-18-b mb-1.5 h-5 w-2/3 animate-pulse rounded bg-gray-200
              lg:mb-2 lg:h-6"
          />

          <div className="mb-2.5 flex items-center gap-2 lg:mb-3">
            <div className="h-5 w-5 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 lg:h-5" />
          </div>

          <div className="mb-3 h-5 w-28 animate-pulse rounded bg-gray-200 lg:mb-5 lg:h-6" />

          <div className="flex h-7 gap-2">
            <div className="h-7 w-17 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-7 w-17 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivitySkeleton;
