"use client";

import ModalPortal from "./ModalPortal";

import { useModalStore } from "@/store/useModalStore";

const Modal = () => {
  const { options, closeModal } = useModalStore();
  if (!options) return null;

  const { position = "center", children, isLoading = false, containerClassName } = options;

  const handleBackdropClick = () => {
    if (isLoading) return;
    closeModal();
  };

  return (
    <ModalPortal>
      {position === "center" ? (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={handleBackdropClick} />
          <div
            className={`relative z-10 h-50 w-100 rounded-3xl bg-white shadow-xl md:rounded-[30px]
              ${containerClassName || ""}`}
          >
            {children}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-9999 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={handleBackdropClick} />
          <div
            className={`relative z-10 h-100 w-full rounded-t-4xl bg-white shadow-xl
              ${containerClassName || ""}`}
          >
            {children}
          </div>
        </div>
      )}
    </ModalPortal>
  );
};

export default Modal;
