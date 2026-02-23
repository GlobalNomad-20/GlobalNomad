import { SkeletonLine } from "./SkeletonBox";

const DetailDescriptionSkeleton = () => {
  return (
    <div className="flex w-81.75 flex-col gap-2 md:w-171 md:gap-3.5 lg:w-167.5 lg:gap-2">
      <div className="typo-16-b md:typo-18-b text-gray-950">체험 설명</div>
      <div className="flex flex-col gap-2">
        <SkeletonLine className="h-4 w-full md:h-5" />
        <SkeletonLine className="h-4 w-full md:h-5" />
      </div>
    </div>
  );
};

export default DetailDescriptionSkeleton;
