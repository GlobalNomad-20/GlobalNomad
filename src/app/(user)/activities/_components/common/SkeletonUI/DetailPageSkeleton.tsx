import DetailDescriptionSkeleton from "./DetailDescriptionSkeleton";
import DetailHeaderSkeleton from "./DetailHeaderSkeleton";
import { DetailMapSkeleton } from "./DetailMapSkeleton";
import DetailReservationBarSkeleton from "./DetailReservationBarSkeleton";
import DetailReservationPCSkeleton from "./DetailReservationPCSkeleton";
import { ReviewListSkeleton } from "./ReviewCardSkeleton";
import { SkeletonLine } from "./SkeletonBox";

const DetailPageSkeleton = () => {
  return (
    <>
      <div className="flex justify-center bg-white">
        <div className="mt-7.5 mb-21.25 md:mt-8.5 md:mb-14.5 lg:mt-22 lg:mb-50">
          <div
            className="flex flex-col gap-5 pb-5 md:gap-6 md:pb-6 lg:flex-row lg:gap-10
              lg:border-none lg:pb-0"
          >
            <div>
              <div
                className="relative h-61.25 w-81.75 rounded-3xl bg-gray-500 md:h-100 md:w-171
                  lg:w-167.5"
              >
                <SkeletonLine className="h-full w-full" />
              </div>
              <DetailHeaderSkeleton isNotDesktop />
              <div className="section-block">
                <DetailDescriptionSkeleton />
              </div>
              <div className="section-block">
                <DetailMapSkeleton />
              </div>
              <div className="w-81.75 py-5 md:w-171 md:pt-7.5 md:pb-10 lg:w-167.5 lg:py-10">
                <div className="w-81.75 md:w-171 lg:w-167.5">
                  <ReviewListSkeleton count={3} />
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <DetailHeaderSkeleton />
              <div className="sticky top-3">
                <DetailReservationPCSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-20 lg:hidden">
        <DetailReservationBarSkeleton />
      </div>
    </>
  );
};

export default DetailPageSkeleton;
