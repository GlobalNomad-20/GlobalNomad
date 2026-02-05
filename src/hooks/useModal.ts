import { useEffect, useCallback, useRef } from "react";

import { useCloseModal, useModalOptions } from "@/store/useModalStore";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const useModal = () => {
  const options = useModalOptions();
  const closeModal = useCloseModal();

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (!options) return;

    if (options.onBackgroundClose) {
      options.onBackgroundClose();
    } else {
      closeModal();
    }
  }, [options, closeModal]);

  useOutsideClick(modalRef, handleClose, !!options);

  useEffect(() => {
    if (!options) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [options, handleClose]);

  return { options, modalRef, handleClose };
};
