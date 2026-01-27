import { create } from "zustand";

import { ModalState, ModalOptions } from "@/types/modal";

export const useModalStore = create<ModalState>((set) => {
  return {
    options: null,
    openModal: (options: ModalOptions) => {
      return set({ options: { ...options, isLoading: false } });
    },
    closeModal: () => {
      return set({ options: null });
    },
    setLoading: (isLoading: boolean) => {
      return set((state) => {
        return {
          options: state.options ? { ...state.options, isLoading } : null,
        };
      });
    },
  };
});
