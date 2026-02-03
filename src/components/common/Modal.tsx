"use client";

import ModalPortal from "./ModalPortal";

import { cn } from "@/utils/cn";
import { useModal } from "@/hooks/useModal";

const Modal = () => {
  const { options, modalRef } = useModal();

  if (!options) return null;

  const { position = "center", children, containerClassName } = options;

  return (
    <ModalPortal>
      <div
        className={cn("fixed inset-0 z-9999 flex bg-black/40", {
          "items-center justify-center": position === "center",
          "items-end justify-center": position === "bottom",
        })}
      >
        <div
          ref={modalRef}
          className={cn(
            "relative z-10 bg-white shadow-xl",
            {
              "h-50 w-100 rounded-3xl md:rounded-[30px]": position === "center",
              "h-100 w-full rounded-t-4xl": position === "bottom",
            },
            containerClassName,
          )}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
