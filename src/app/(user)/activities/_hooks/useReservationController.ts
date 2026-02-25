"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { useAvailableSchedule, useCreateActivityReservation } from "@/hooks/queries/useActivities";
import { useModal } from "@/hooks/useModal";

export const useReservationController = (activityId?: number, price?: number) => {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [reservationTime, setReservationTime] = useState<number | undefined>();
  const [reservationGuest, setReservationGuest] = useState(1);

  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen, onClose: onSuccessClose } = useModal();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useModal();
  const { isOpen: isExistOpen, onOpen: onExistOpen, onClose: onExistClose } = useModal();

  const year = selectedDate?.split("-")[0];
  const month = selectedDate?.split("-")[1];

  const { data: schedules } = useAvailableSchedule({ activityId, year, month });

  const { mutate } = useCreateActivityReservation(activityId);

  const totalPrice = useMemo(() => {
    return (price ?? 0) * reservationGuest;
  }, [price, reservationGuest]);

  const handleLinkLogin = () => {
    onLoginOpen();
    router.push("/login");
  };

  const handleExistingReservation = () => {
    onExistOpen();
  };

  const handleReserve = () => {
    if (!reservationTime) return;

    mutate(
      { scheduleId: reservationTime, headCount: reservationGuest },
      {
        onSuccess: () => {
          return onSuccessOpen();
        },
        onError: (err) => {
          // 로그인 X (error 401)
          if (axios.isAxiosError(err) && err.response?.status === 401) {
            onLoginOpen();
            return;
          }

          // 동일 계정 같은 예약 중복 (error 409)
          if (axios.isAxiosError(err) && err.response?.status === 409) {
            onExistOpen();
            return;
          }

          alert("예약 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        },
      },
    );
  };

  return {
    // state
    selectedDate,
    setSelectedDate,
    reservationTime,
    setReservationTime,
    reservationGuest,
    setReservationGuest,

    // derived
    schedules,
    totalPrice,
    buttonActive: reservationTime != null,

    // actions
    handleReserve,
    handleLinkLogin,
    handleExistingReservation,

    // modals
    isSuccessOpen,
    onSuccessClose,
    isLoginOpen,
    onLoginClose,
    isExistOpen,
    onExistClose,
  };
};
