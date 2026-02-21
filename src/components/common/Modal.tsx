"use client";

import ModalPortal from "./ModalPortal";

import { cn } from "@/utils/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "center" | "bottom";
  children?: React.ReactNode;
  onBackgroundClick?: () => void;
  containerClassName?: string;
}

const Modal = ({
  isOpen = false,
  onClose,
  position = "center",
  children,
  onBackgroundClick,
  containerClassName,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = () => {
    if (onBackgroundClick) {
      onBackgroundClick();
      return;
    }
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalPortal>
      <div
        className={cn("fixed inset-0 z-9999 flex bg-black/40", {
          "items-center justify-center": position === "center",
          "items-end justify-center": position === "bottom",
        })}
        onClick={handleBackgroundClick}
      >
        <div
          className={cn(
            "relative z-10 bg-white shadow-xl",
            {
              "h-50 w-100 rounded-3xl md:rounded-4xl": position === "center",
              "h-100 w-full rounded-t-3xl": position === "bottom",
            },
            containerClassName,
          )}
          onClick={handleContentClick}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
