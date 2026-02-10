import ActivityCardSkeleton from "./ActivityCardSkeleton";

interface ActivityCardSkeletonListProps {
  count: number;
}

const ActivityCardSkeletonList = ({ count }: ActivityCardSkeletonListProps) => {
  const skeletons = Array.from({ length: count });

  return (
    <>
      {skeletons.map((_, i) => {
        return <ActivityCardSkeleton key={i} />;
      })}
    </>
  );
};

export default ActivityCardSkeletonList;
