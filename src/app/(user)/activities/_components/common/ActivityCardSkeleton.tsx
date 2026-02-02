interface ActivityCardSkeletonProps {
  isSmall?: boolean;
}

const ActivityCardSkeleton = ({ isSmall = false }: ActivityCardSkeletonProps) => {
  const mobileWidth = isSmall ? "w-32.75" : "w-[155px]";

  return (
    <div
      className={`relative shrink-0 rounded-[18px] bg-white
        shadow-[0px_2.25px_13.5px_0px_rgba(156,180,202,0.2)] ${mobileWidth} h-60.5 md:h-105.75
        md:w-82.75 lg:h-91.5 lg:w-65.5`}
    >
      <div className="h-[60%] w-full animate-pulse rounded-t-[18px] bg-gray-200" />
      <div className="flex flex-col gap-2 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default ActivityCardSkeleton;
