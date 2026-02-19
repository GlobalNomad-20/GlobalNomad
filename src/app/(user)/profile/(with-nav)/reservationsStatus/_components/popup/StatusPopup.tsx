"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

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
        "absolute z-9999 rounded-xl border border-gray-200 bg-white p-4 shadow-lg",
        !position ? "invisible opacity-0" : "visible opacity-100 transition-opacity",
      )}
      style={{
        top: position ? `${position.top}px` : 0,
        left: position ? `${position.left}px` : 0,
      }}
    >
      <h3>예약 상태 팝업</h3>
      <p>Activity ID: {activityId}</p>
      <p>Date: {date}</p>
      <button onClick={handleClose}>닫기</button>
    </div>,
    document.body,
  );
};

export default StatusPopup;
