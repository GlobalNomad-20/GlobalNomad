import CustomImage from "@/components/common/CustomImage";
import { ActivityDetailResponse } from "@/types/activityIdParams";

interface ActivityImageSectionProps {
  data?: ActivityDetailResponse;
}

const ActivityImageSection = ({ data }: ActivityImageSectionProps) => {
  const ActivityImage = data?.subImages[0].imageUrl;

  return (
    <div className="relative h-61.25 w-81.75 rounded-3xl bg-gray-500 md:h-100 md:w-171 lg:w-167.5">
      {ActivityImage && (
        <CustomImage
          src={ActivityImage}
          alt="체험 이미지"
          fill
          className="rounded-3xl object-cover"
        />
      )}
    </div>
  );
};

export default ActivityImageSection;
