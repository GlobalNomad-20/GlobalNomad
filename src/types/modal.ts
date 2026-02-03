export interface ModalOptions {
  position?: "center" | "bottom";
  children?: React.ReactNode;
  containerClassName?: string;
  onBackgroundClose?: () => void;
}

export interface ModalState {
  options: ModalOptions | null;
  actions: {
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
  };
}
