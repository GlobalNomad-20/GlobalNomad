import ActivityCardSkeleton from "./ActivityCardSkeleton";

const ActivityCardSkeletonList = ({ count }: { count: number }) => {
  return (
    <>
      {new Array(count).fill(null).map((_, i) => {
        return <ActivityCardSkeleton key={i} />;
      })}
    </>
  );
};

export default ActivityCardSkeletonList;
