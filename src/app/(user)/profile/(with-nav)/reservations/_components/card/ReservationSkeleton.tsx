"use client";

import { cn } from "@/utils/cn";

const ReservationSkeleton = () => {
  return (
    <div className={cn("max-w-160", "border-t border-t-gray-50 pt-5 lg:border-t-0 lg:pt-0")}>
      <div className="mb-3 px-2 lg:hidden">
        <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <div
        className={cn(
          "relative h-34 max-w-160",
          "mb-4 rounded-3xl p-6",
          "lg:mb-0 lg:h-45 lg:rounded-4xl",
          "shadow-[0_4px_24px_0_rgba(156,180,202,0.2)]",
        )}
      >
        <div className="absolute inset-0 -right-1 overflow-hidden rounded-3xl lg:rounded-4xl">
          <div className="h-full w-full animate-pulse bg-gray-200" />
        </div>
        <div
          className={cn(
            "absolute top-0 -left-1 flex h-34 w-4/5 flex-col items-start justify-start",
            "rounded-3xl bg-white p-5",
            "lg:h-45 lg:rounded-4xl lg:px-10 lg:py-7.5",
            "shadow-[0_-8px_20px_0_rgba(0,0,0,0.05)]",
          )}
        >
          <div className="mb-2 h-6 w-20 animate-pulse rounded-4xl bg-gray-200 lg:mb-3" />
          <div className="mb-1 h-5 w-3/4 animate-pulse rounded bg-gray-200 lg:mb-2.5 lg:h-6" />
          <div className="mb-2 h-4 w-32 animate-pulse rounded bg-gray-200 lg:h-5" />
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2">
              <div className="h-6 w-24 animate-pulse rounded bg-gray-200 lg:h-7" />
              <div className="h-6 w-12 animate-pulse rounded bg-gray-200 lg:h-7" />
            </div>
            <div className="hidden h-8 w-18 animate-pulse rounded-lg bg-gray-200 lg:block" />
          </div>
        </div>
      </div>
      <div className="h-10 w-full max-w-160 animate-pulse rounded-lg bg-gray-200 lg:hidden" />
    </div>
  );
};

export default ReservationSkeleton;
