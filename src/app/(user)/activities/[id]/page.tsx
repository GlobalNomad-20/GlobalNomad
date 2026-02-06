import SectionBlock from "../_components/common/SectionBlock";
import ActivityDescriptionSection from "../_components/sections/detail/ActivityDescriptionSection";
import ActivityHeaderSection from "../_components/sections/detail/ActivityHeaderSection";
import ActivityImageSection from "../_components/sections/detail/ActivityImageSection";
import ActivityMapSection from "../_components/sections/detail/ActivityMapSection";
import ActivityReviewSection from "../_components/sections/detail/ActivityReviewSection";

const ActivityDetail = () => {
  return (
    <div className="flex justify-center bg-white">
      <div className="mt-7.5 mb-21.25 md:mt-8.5 md:mb-14.5 lg:mt-22 lg:mb-50">
        <div
          className="flex flex-col gap-5 border-b border-gray-100 pb-5 md:gap-6 md:pb-6 lg:flex-row
            lg:gap-10 lg:border-none lg:pb-0"
        >
          <ActivityImageSection />
          <ActivityHeaderSection />
        </div>
        <SectionBlock>
          <ActivityDescriptionSection />
        </SectionBlock>
        <SectionBlock>
          <ActivityMapSection />
        </SectionBlock>
        <SectionBlock>
          <ActivityReviewSection />
        </SectionBlock>
      </div>
    </div>
  );
};

export default ActivityDetail;
