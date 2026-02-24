"use client";

import { useState } from "react";

import ReviewCard from "../../common/detail/ReviewCard";
import EmptyResult from "../../common/main/EmptyResult";

import Pagination from "@/app/(user)/_components/pagination/Pagination";
import StarSvg from "@/assets/svg/StarSvg";
import { useActivityIdReviews } from "@/hooks/queries/useActivities";
import { ActivityDetailResponse } from "@/types/activityIdParams";

// eslint-disable-next-line @typescript-eslint/naming-convention
const PAGE_LIMIT = 3;

interface ActivityReviewSectionProps {
  data: ActivityDetailResponse;
}

const ActivityReviewSection = ({ data }: ActivityReviewSectionProps) => {
  const [page, setPage] = useState(1);

  const activityId = data.id;

  const { data: reviewsData, isPlaceholderData } = useActivityIdReviews({
    activityId: activityId,
    page,
    size: PAGE_LIMIT,
  });

  const totalCount = reviewsData?.totalCount ?? 0;
  const totalPage = Math.ceil(totalCount / PAGE_LIMIT);

  const handlePage = (num: number) => {
    setPage(num);
  };

  const averageRating = Math.trunc(data.rating);
  const ratingComments: Record<number, string> = {
    1: "매우 불만족",
    2: "불만족",
    3: "보통",
    4: "만족",
    5: "매우 만족",
  };
  const averageRatingComment = ratingComments[averageRating];

  if (!totalCount) {
    return (
      <div className="w-81.75 md:w-171 lg:w-167.5">
        <div className="mb-2 flex items-center justify-start gap-2">
          <div className="typo-16-b md:typo-18-b text-gray-950">체험 후기</div>
          <div className="font-semibol md:typo-16-b text-sm text-[#79747E]">
            {data.reviewCount}개
          </div>
        </div>
        <div className="mb-7.5 flex flex-col items-center">
          <div className="typo-24-b md:typo-32-b mb-0.5 text-gray-950">{data.rating}</div>
          <div className="typo-14-b md:typo-16-b mb-1.5 text-gray-950">{averageRatingComment}</div>
          <div className="flex items-center gap-0.5">
            <StarSvg className="h-4 w-4" />
            <div className="typo-14-m text-[#79747E]">0개 후기</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-10 md:gap-5">
          <EmptyResult message="등록된 리뷰가 없습니다." />
        </div>
      </div>
    );
  }

  return (
    <div className="w-81.75 md:w-171 lg:w-167.5">
      <div className="mb-2 flex items-center justify-start gap-2">
        <div className="typo-16-b md:typo-18-b text-gray-950">체험 후기</div>
        <div className="font-semibol md:typo-16-b text-sm text-[#79747E]">{data.reviewCount}개</div>
      </div>
      <div className="mb-7.5 flex flex-col items-center">
        <div className="typo-24-b md:typo-32-b mb-0.5 text-gray-950">{data.rating}</div>
        <div className="typo-14-b md:typo-16-b mb-1.5 text-gray-950">{averageRatingComment}</div>
        <div className="flex items-center gap-0.5">
          <StarSvg className="h-4 w-4" />
          <div className="typo-14-m text-[#79747E]">{data?.reviewCount}개 후기</div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 md:gap-5">
        {reviewsData?.reviews.map((review) => {
          return <ReviewCard key={review.id} data={review} />;
        })}
      </div>
      <div className="mt-7.5 flex flex-col items-center md:mt-10 lg:mt-7.5">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={handlePage}
          isPlaceholderData={isPlaceholderData}
        />
      </div>
    </div>
  );
};

export default ActivityReviewSection;
