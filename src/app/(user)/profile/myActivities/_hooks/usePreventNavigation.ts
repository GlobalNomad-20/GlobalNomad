"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface UsePreventNavigationProps {
  isDirty: boolean;
  onNavigationAttempt: () => void;
}

export const usePreventNavigation = ({
  isDirty,
  onNavigationAttempt,
}: UsePreventNavigationProps) => {
  const router = useRouter();

  const pendingUrlRef = useRef<string | null>(null);
  const isNavigatingRef = useRef(false);

  const handleAllowNavigation = useCallback(() => {
    isNavigatingRef.current = true;

    if (pendingUrlRef.current === "__BACK__") {
      window.history.go(-2);
    } else if (pendingUrlRef.current) {
      router.push(pendingUrlRef.current);
    }

    pendingUrlRef.current = null;
  }, [router]);

  const handleCancelNavigation = useCallback(() => {
    pendingUrlRef.current = null;
    isNavigatingRef.current = false;
  }, []);

  const disableProtection = useCallback(() => {
    isNavigatingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isDirty) {
      isNavigatingRef.current = false;
      return;
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isNavigatingRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = () => {
      if (isNavigatingRef.current) return;
      window.history.pushState(null, "", window.location.href);
      pendingUrlRef.current = "__BACK__";
      onNavigationAttempt();
    };

    const handleClick = (e: MouseEvent) => {
      if (isNavigatingRef.current) return;

      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        const url = new URL(link.href, window.location.origin);
        if (url.origin === window.location.origin && url.pathname !== window.location.pathname) {
          e.preventDefault();
          pendingUrlRef.current = link.href;
          onNavigationAttempt();
        }
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick, true);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick, true);
    };
  }, [isDirty, onNavigationAttempt]);

  return {
    handleAllowNavigation,
    handleCancelNavigation,
    disableProtection,
  };
};
