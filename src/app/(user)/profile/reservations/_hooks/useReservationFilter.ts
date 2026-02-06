import { useState } from "react";

import { ReservationStatus } from "@/types/reservations";

// 상태 필터 관리 훅
const useReservationFilter = () => {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | undefined>(undefined);

  const getEmptyState = (isLoading: boolean, hasReservations: boolean) => {
    return {
      isInitialEmpty: !isLoading && !selectedStatus && !hasReservations,
      isFilterEmpty: !isLoading && !!selectedStatus && !hasReservations,
    };
  };

  return { selectedStatus, setSelectedStatus, getEmptyState };
};

export default useReservationFilter;
