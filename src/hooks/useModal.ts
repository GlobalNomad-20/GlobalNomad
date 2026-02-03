import { useEffect, useCallback, useRef } from "react";

import { useModalStore } from "@/store/useModalStore";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const useModal = () => {
  const options = useModalStore((state) => {
    return state.options;
  });
  const closeModal = useModalStore((state) => {
    return state.actions.closeModal;
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    if (!options) return;

    if (options.onBackgroundClose) {
      options.onBackgroundClose();
      return;
    }

    closeModal();
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
