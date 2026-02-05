import ActivityDescriptionSection from "../_components/sections/detail/ActivityDescriptionSection";
import ActivityHeaderSection from "../_components/sections/detail/ActivityHeaderSection";
import ActivityImageSection from "../_components/sections/detail/ActivityImageSection";
import ActivityMapSection from "../_components/sections/detail/ActivityMapSection";
import ActivityReviewSection from "../_components/sections/detail/ActivityReviewSection";

const ActivityDetail = () => {
  return (
    <div className="flex justify-center bg-white">
      <div className="mt-7.5 md:mt-8.5 lg:mt-22">
        <div className="flex flex-col gap-5 md:gap-6 lg:flex-row lg:gap-10">
          <ActivityImageSection />
          <ActivityHeaderSection />
        </div>
        <ActivityDescriptionSection />
        <ActivityMapSection />
        <ActivityReviewSection />
      </div>
    </div>
  );
};

export default ActivityDetail;
