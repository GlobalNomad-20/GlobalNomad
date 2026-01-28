"use client";

import { RefObject, useEffect } from "react";

export const useOutsideClick = (
  refs: Array<RefObject<HTMLElement | null>> | RefObject<HTMLElement | null>,
  callback: () => void,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    const refList = Array.isArray(refs) ? refs : [refs];

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;

      const isInside = refList.some((ref) => {
        const el = ref.current;
        return el ? el.contains(target) : false;
      });

      if (!isInside) callback();
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      return document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [refs, callback, enabled]);
};
