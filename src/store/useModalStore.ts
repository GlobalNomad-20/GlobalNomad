import { create } from "zustand";

import { ModalState } from "@/types/modal";

export const useModalStore = create<ModalState>((set) => {
  return {
    options: null,
    openModal: (options) => {
      return set({ options });
    },
    closeModal: () => {
      return set({ options: null });
    },
    updateOptions: (newOptions) => {
      return set((state) => {
        return {
          options: state.options ? { ...state.options, ...newOptions } : null,
        };
      });
    },
  };
});
