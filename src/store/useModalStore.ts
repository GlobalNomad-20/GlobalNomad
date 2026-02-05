import { create } from "zustand";

import { ModalState } from "@/types/modal";

export const useModalStore = create<ModalState>((set) => {
  return {
    options: null,
    actions: {
      openModal: (options) => {
        return set({ options });
      },
      closeModal: () => {
        return set({ options: null });
      },
    },
  };
});

export const useModalOptions = () => {
  return useModalStore((state) => {
    return state.options;
  });
};
export const useOpenModal = () => {
  return useModalStore((state) => {
    return state.actions.openModal;
  });
};
export const useCloseModal = () => {
  return useModalStore((state) => {
    return state.actions.closeModal;
  });
};
