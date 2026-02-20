import { RefObject, useEffect, useState } from "react";

interface Position {
  top: number;
  left: number;
}

/**
 * 뷰포트를 벗어나지 않도록 위치를 자동 계산하는 훅
 * @param anchorEl 기준이 되는 엘리먼트
 * @param floatingRef 대상 엘리먼트 (크기 측정을 위해 필요)
 * @param offset 팝업과 타겟 사이의 여백 (기본값: 8)
 */
export const useAutoPosition = (
  anchorEl: HTMLElement | null,
  floatingRef: RefObject<HTMLElement | null>,
  offset: number = 8,
) => {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!anchorEl || !floatingRef.current) return;

    const calculatePosition = () => {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popupRect = floatingRef.current!.getBoundingClientRect();

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = anchorRect.right + offset;
      let top = anchorRect.top + offset;

      if (left + popupRect.width > viewportWidth) {
        left = anchorRect.left - popupRect.width - offset;
      }

      if (top + popupRect.height > viewportHeight) {
        top = anchorRect.bottom - popupRect.height - offset;
      }

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
      });
    };

    calculatePosition();

    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, { passive: true });

    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition);
    };
  }, [anchorEl, floatingRef, offset]);

  return position;
};
