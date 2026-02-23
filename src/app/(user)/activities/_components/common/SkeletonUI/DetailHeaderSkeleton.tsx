import { SkeletonLine } from "./SkeletonBox";

import MapSvg from "@/assets/svg/MapSvg";
import StarSvg from "@/assets/svg/StarSvg";
import { cn } from "@/utils/cn";

interface DetailHeaderSkeletonProps {
  isNotDesktop?: boolean;
}

const DetailHeaderSkeleton = ({ isNotDesktop = false }: DetailHeaderSkeletonProps) => {
  return (
    <div
      className={cn(
        `flex w-81.75 items-start justify-between border-b border-gray-100 py-5 md:w-171 md:py-6
        lg:w-102.5 lg:border-none lg:pb-0`,
        isNotDesktop && "lg:hidden",
      )}
    >
      <div className="w-full pr-4">
        <div className="typo-13-m md:typo-14-m mb-1 md:mb-2.5 lg:mb-2">
          <SkeletonLine className="h-4 w-20 md:h-5 md:w-24" />
        </div>
        <div className="typo-18-b md:typo-24-b mb-4 lg:mb-4.25">
          <SkeletonLine className="h-6 w-[85%] md:h-8 md:w-[70%]" />
        </div>
        <div className="mb-2.5 flex items-center justify-start gap-1.5">
          <div className="opacity-30">
            <StarSvg className="h-4 w-4" />
          </div>
          <div className="typo-14-m flex gap-0.75">
            <SkeletonLine className="h-4 w-20 md:h-5 md:w-24" />
          </div>
        </div>
        <div className="flex items-center justify-start gap-0.5">
          <div className="opacity-30">
            <MapSvg className="h-4 w-4" />
          </div>
          <div className="typo-14-m w-full">
            <SkeletonLine className="h-4 w-[90%] md:h-5 md:w-[75%]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailHeaderSkeleton;
