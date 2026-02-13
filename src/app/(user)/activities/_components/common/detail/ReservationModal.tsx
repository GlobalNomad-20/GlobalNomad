/* eslint-disable react/jsx-handler-names */
"use client";

import ReservationMobile from "../../reservation/layouts/ReservationMobile";
import ReservationTablet from "../../reservation/layouts/ReservationTablet";

import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ReservationModalProps {
  onComplete: () => void;
}

const ReservationModal = ({ onComplete }: ReservationModalProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-full justify-center md:px-7.5">
      {isMobile ? (
        <ReservationMobile onComplete={onComplete} />
      ) : (
        <ReservationTablet onComplete={onComplete} />
      )}
    </div>
  );
};

export default ReservationModal;
