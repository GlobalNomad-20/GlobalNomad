import ActivityDescriptionSection from "../_components/sections/detail/ActivityDescriptionSection";
import ActivityHeaderSection from "../_components/sections/detail/ActivityHeaderSection";
import ActivityImageSection from "../_components/sections/detail/ActivityImageSection";

const ActivityDetail = () => {
  return (
    <div>
      <div>
        <div>
          <ActivityImageSection />
          <ActivityHeaderSection />
        </div>
        <ActivityDescriptionSection />
      </div>
    </div>
  );
};

export default ActivityDetail;
