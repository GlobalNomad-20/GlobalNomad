import { useEffect, useRef } from "react";

interface UseIntersectionObserverProps {
  onIntersect: () => void;
  enabled?: boolean;
  threshold?: number;
}

export const useIntersectionObserver = ({
  onIntersect,
  enabled = true,
  threshold = 0.5,
}: UseIntersectionObserverProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { threshold },
    );

    const target = targetRef.current;
    observer.observe(target);

    return () => {
      return observer.unobserve(target);
    };
  }, [enabled, onIntersect, threshold]);

  return { targetRef };
};
