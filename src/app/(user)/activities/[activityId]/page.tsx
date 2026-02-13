"use client";

import { useParams } from "next/navigation";

import ReservationBar from "../_components/common/detail/ReservationBar";
import ReservationDesktop from "../_components/reservation/layouts/ReservationDesktop";
import ActivityDescriptionSection from "../_components/sections/detail/ActivityDescriptionSection";
import ActivityHeaderSection from "../_components/sections/detail/ActivityHeaderSection";
import ActivityImageSection from "../_components/sections/detail/ActivityImageSection";
import ActivityMapSection from "../_components/sections/detail/ActivityMapSection";
import ActivityReviewSection from "../_components/sections/detail/ActivityReviewSection";
import useActivityId from "../_hooks/useActivityId";

const ActivityDetail = () => {
  const param = useParams();
  const activityId = Number(param.activityId);

  const { data: activityIdData } = useActivityId(activityId);

  if (!activityIdData) return null;

  return (
    <>
      <div className="flex justify-center bg-white">
        <div className="mt-7.5 mb-21.25 md:mt-8.5 md:mb-14.5 lg:mt-22 lg:mb-50">
          <div
            className="flex flex-col gap-5 pb-5 md:gap-6 md:pb-6 lg:flex-row lg:gap-10
              lg:border-none lg:pb-0"
          >
            <div>
              <ActivityImageSection data={activityIdData} />
              <ActivityHeaderSection data={activityIdData} isNotDesktop />
              <div className="section-block">
                <ActivityDescriptionSection data={activityIdData} />
              </div>
              <div className="section-block">
                <ActivityMapSection data={activityIdData} />
              </div>
              <div className="w-81.75 py-5 md:w-171 md:pt-7.5 md:pb-10 lg:w-167.5 lg:py-10">
                <ActivityReviewSection data={activityIdData} />
              </div>
            </div>
            <div className="hidden lg:block">
              <ActivityHeaderSection data={activityIdData} />
              <div className="sticky top-3">
                <ReservationDesktop />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 z-20 lg:hidden">
        <ReservationBar data={activityIdData} />
      </div>
    </>
  );
};

export default ActivityDetail;
