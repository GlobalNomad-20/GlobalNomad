import ActivityCard from "../common/ActivityCard";

const PopularActivitySection = () => {
  return (
    <div className="flex w-81.75 flex-col gap-3.5 md:w-171 md:gap-4 lg:w-280">
      <div className="typo-18-b md:typo-32-b leading-6.5 md:leading-8">🔥 인기 체험</div>
      <div className="d:gap-5 flex gap-3 lg:gap-6">
        <ActivityCard />
        <ActivityCard />
      </div>
    </div>
  );
};

export default PopularActivitySection;
