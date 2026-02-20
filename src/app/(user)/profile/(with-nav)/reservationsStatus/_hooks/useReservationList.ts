import { useState } from "react";

import { useGetMyActivities } from "@/hooks/queries/useMyActivities";
import { Activity } from "@/types/activityCardList";

export const useReservationList = () => {
  const {
    data: reservationsList,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = useGetMyActivities({
    size: 10,
  });

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleSelectedActivity = (activity: Activity) => {
    setSelectedActivity(activity);
  };

  const handleReachEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const isEmpty = reservationsList?.pages[0]?.activities?.length === 0;

  return {
    reservationsList,
    selectedActivity,
    isFetchingNextPage,
    isEmpty,
    isLoading,
    handleSelectedActivity,
    handleReachEnd,
  };
};
