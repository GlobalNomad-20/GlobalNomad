"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

import { usePopup } from "@/hooks/usePopup";

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

  useEffect(() => {
    if (triggerRef) triggerRef.current = anchorEl;
  }, [anchorEl, triggerRef]);

  useEffect(() => {
    if (!open) handleParentClose();
  }, [open, handleParentClose]);

  if (!open) return null;

  const rect = anchorEl.getBoundingClientRect();
  const top = rect.top + window.scrollY + 8;
  const left = rect.right + window.scrollX;

  return createPortal(
    <div
      ref={popupRef}
      className="absolute z-9999 rounded-md border bg-white p-4 shadow-lg"
      style={{ top, left }}
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
