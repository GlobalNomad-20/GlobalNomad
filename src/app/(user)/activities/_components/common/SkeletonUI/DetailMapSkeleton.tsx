import { SkeletonLine } from "./SkeletonBox";

export const DetailMapSkeleton = () => {
  return (
    <div className="flex w-81.75 flex-col gap-2 md:w-171 md:gap-3.5 lg:w-167.5 lg:gap-2">
      <div className="typo-16-b md:typo-18-b text-gray-950">오시는 길</div>
      <div className="text-sm font-semibold text-gray-950">
        <SkeletonLine className="h-4 w-24 md:h-5 md:w-28" />
      </div>
      <div id="map" className="h-45 w-full overflow-hidden rounded-2xl md:h-75 lg:h-112.5">
        <SkeletonLine className="h-full w-full" />
      </div>
    </div>
  );
};
