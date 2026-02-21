"use client";

import { useReservationController } from "../../../_hooks/useReservationController";
import ReservationMobile from "../../reservation/layouts/ReservationMobile";
import ReservationTablet from "../../reservation/layouts/ReservationTablet";

import { useMediaQuery } from "@/hooks/useMediaQuery";

type ReservationController = ReturnType<typeof useReservationController>;

interface ReservationModalProps {
  onClose: () => void;
  reservationController: ReservationController;
}

const ReservationModal = ({
  onClose: handleClose,
  reservationController,
}: ReservationModalProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-full justify-center md:px-7.5">
      {isMobile ? (
        <ReservationMobile onClose={handleClose} reservationController={reservationController} />
      ) : (
        <ReservationTablet onClose={handleClose} reservationController={reservationController} />
      )}
    </div>
  );
};

export default ReservationModal;
