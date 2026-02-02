"use client";

import ModalPortal from "./ModalPortal";

import { useModal } from "@/hooks/useModal";

const Modal = () => {
  const { options, modalRef } = useModal();

  if (!options) return null;

  const { position = "center", children, containerClassName } = options;

  const wrapperVariants = {
    center: "items-center justify-center",
    bottom: "items-end justify-center",
  };

  const contentVariants = {
    center: "h-50 w-100 rounded-3xl md:rounded-[30px]",
    bottom: "h-100 w-full rounded-t-4xl",
  };

  return (
    <ModalPortal>
      <div className={`fixed inset-0 z-9999 flex bg-black/40 ${wrapperVariants[position]}`}>
        <div
          ref={modalRef}
          className={`relative z-10 bg-white shadow-xl ${contentVariants[position]}
            ${containerClassName || ""}`}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
