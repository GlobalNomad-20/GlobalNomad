"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const useIsMounted = () => {
  return useSyncExternalStore(
    () => {
      return () => {};
    },
    () => {
      return true;
    },
    () => {
      return false;
    },
  );
};

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const mounted = useIsMounted();

  useEffect(() => {
    if (!mounted) return;

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
};

export default ModalPortal;
