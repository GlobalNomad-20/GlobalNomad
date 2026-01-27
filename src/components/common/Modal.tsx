"use client";

import Button from "./Button";
import ModalPortal from "./ModalPortal";

import { useModalStore } from "@/store/useModalStore";

const Modal = () => {
  const { options, closeModal, setLoading } = useModalStore();

  if (!options) {
    return null;
  }

  const {
    icon,
    content,
    buttonCount = 1,
    isLoading = false,
    cancelText = "취소",
    confirmText = "확인",
    onCancel,
    onConfirm,
  } = options;

  const handleBackdropClick = () => {
    if (isLoading) {
      return;
    }
    onCancel?.();
    closeModal();
  };

  const handleCancelClick = () => {
    if (isLoading) {
      return;
    }
    onCancel?.();
    closeModal();
  };

  const handleConfirmClick = async () => {
    if (isLoading) {
      return;
    }
    if (!onConfirm) {
      closeModal();
      return;
    }

    setLoading(true);
    try {
      await onConfirm();
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const isDualButton = buttonCount === 2;

  const containerClassName = `relative z-10 m-5 flex w-full flex-col rounded-3xl bg-white shadow-xl md:rounded-[30px] ${
    isDualButton
      ? "max-w-80 min-h-54 justify-between px-11 py-6 md:max-w-100 md:min-h-71.5 md:px-15 md:py-7.5"
      : "max-w-80 min-h-fit justify-center px-10 pb-7.5 pt-8.5 md:min-h-42.5 md:pb-9 md:pt-11.5"
  }`;

  const textClassName = `text-center whitespace-pre-wrap ${
    isDualButton ? "typo-18-body-b md:typo-20-body-b" : "typo-16-b md:typo-18-b"
  }`;

  return (
    <ModalPortal>
      <div className="fixed inset-0 z-9999 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={handleBackdropClick} />
        <div className={containerClassName}>
          {icon && <div className="mb-4 flex justify-center text-4xl">{icon}</div>}
          <p className={textClassName}>{content}</p>
          <div
            className={`flex
              ${isDualButton ? "mt-5 justify-between gap-3 md:mt-6" : "mt-4 justify-center md:mt-5"}`}
          >
            {isDualButton ? (
              <>
                <Button
                  onClick={handleCancelClick}
                  disabled={isLoading}
                  variant="outline"
                  className="w-28 py-3 md:w-34 md:py-3.5"
                >
                  {cancelText}
                </Button>
                <Button
                  onClick={handleConfirmClick}
                  disabled={isLoading}
                  className="w-28 py-3 md:w-34 md:py-3.5"
                >
                  {isLoading ? "처리 중..." : confirmText || "실행하기"}
                </Button>
              </>
            ) : (
              <Button
                onClick={handleConfirmClick}
                disabled={isLoading}
                className="w-45 py-3 md:w-50 md:py-3.5"
              >
                {isLoading ? "처리 중..." : confirmText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
