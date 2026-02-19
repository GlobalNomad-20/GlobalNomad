import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import CalendarSection from "./_components/calendar/CalenderSection";

import { getMyActivitiesServer } from "@/api/myActivities.server";
import { getMyActivitiesQueryOptions } from "@/hooks/queries/options/myActivitiesOptions";

const ReservationsStatusPage = async () => {
  const queryClient = new QueryClient();
  const baseOptions = getMyActivitiesQueryOptions(10);

  await queryClient.prefetchInfiniteQuery({
    ...baseOptions,
    queryFn: async ({ pageParam }) => {
      return getMyActivitiesServer({
        size: 10,
        cursorId: pageParam as number | undefined,
      });
    },
  });

  return (
    <div className="mb-3.5 w-full pt-7.5 md:mb-24 md:p-0">
      <div className="mb-11 px-6 py-2.5 md:px-0">
        <h2 className="typo-18-b mb-2.5">예약 현황</h2>
        <p className="typo-14-m text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CalendarSection />
      </HydrationBoundary>
    </div>
  );
};

export default ReservationsStatusPage;
