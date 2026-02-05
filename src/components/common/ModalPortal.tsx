"use client";

import { useSyncExternalStore } from "react";
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

  if (!mounted) return null;

  return createPortal(children, document.body);
};

export default ModalPortal;
