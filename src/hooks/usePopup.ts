"use client";

import { useEffect, useRef, useState } from "react";

import { useOutsideClick } from "./useOutsideClick";

export const usePopup = <
  TPopup extends HTMLElement = HTMLDivElement,
  TTrigger extends HTMLElement = HTMLButtonElement,
>() => {
  const [open, setOpen] = useState(false);

  const popupRef = useRef<TPopup>(null);
  const triggerRef = useRef<TTrigger>(null);

  const openPopup = () => {
    return setOpen(true);
  };
  const handleClose = () => {
    return setOpen(false);
  };
  const handleToggle = () => {
    return setOpen((v) => {
      return !v;
    });
  };

  useOutsideClick([popupRef, triggerRef], handleClose, open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      return document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return { popupRef, triggerRef, open, openPopup, handleClose, handleToggle };
};
