import ReviewCard from "../../common/ReviewCard";

import StarSvg from "@/assets/svg/StarSvg";

const ActivityReviewSection = () => {
  return (
    <div className="w-81.75 md:w-171 lg:w-167.5">
      <div className="mb-2 flex items-center justify-start gap-2">
        <div className="typo-16-b md:typo-18-b text-gray-950">체험 후기</div>
        <div className="font-semibol md:typo-16-b text-sm text-[#79747E]">1,300개</div>
      </div>
      <div className="mb-7.5 flex flex-col items-center">
        <div className="typo-24-b md:typo-32-b mb-0.5 text-gray-950">4.2</div>
        <div className="typo-14-b md:typo-16-b mb-1.5 text-gray-950">매우 만족</div>
        <div className="flex items-center gap-0.5">
          <StarSvg className="h-4 w-4" />
          <div className="typo-14-m text-[#79747E]">1,300개 후기</div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ReviewCard />
      </div>
      <div className="mt-7.5 flex flex-col items-center md:mt-10 lg:mt-7.5">페이지네이션</div>
    </div>
  );
};

export default ActivityReviewSection;
