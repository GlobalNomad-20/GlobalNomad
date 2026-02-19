"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import ReservationStatusContent from "../statusContent/ReservationStatusContent";

import { useAutoPosition } from "@/hooks/useAutoPosition";
import { usePopup } from "@/hooks/usePopup";
import { cn } from "@/utils/cn";

interface StatusPopupProps {
  activityId: number;
  date: string;
  anchorEl: HTMLElement;
  onClose: () => void;
}

const StatusPopup = ({
  activityId,
  date,
  anchorEl,
  onClose: handleParentClose,
}: StatusPopupProps) => {
  const { popupRef, triggerRef, open, handleClose } = usePopup<HTMLDivElement, HTMLElement>(true);

  const position = useAutoPosition(anchorEl, popupRef, 8);

  useEffect(() => {
    if (triggerRef) triggerRef.current = anchorEl;
  }, [anchorEl, triggerRef]);

  useEffect(() => {
    if (!open) handleParentClose();
  }, [open, handleParentClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={popupRef}
      className={cn(
        "absolute z-9999 h-98.25 w-85 rounded-xl border border-gray-200 bg-white shadow-lg",
        !position ? "invisible opacity-0" : "visible opacity-100 transition-opacity",
      )}
      style={{
        top: position ? `${position.top}px` : 0,
        left: position ? `${position.left}px` : 0,
      }}
    >
      <ReservationStatusContent activityId={activityId} date={date} onClose={handleClose} />
    </div>,
    document.body,
  );
};

export default StatusPopup;
