export interface ModalOptions {
  position?: "center" | "bottom";
  children?: React.ReactNode;
  isLoading?: boolean;
  containerClassName?: string;
}

export interface ModalState {
  options: ModalOptions | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  updateOptions: (options: Partial<ModalOptions>) => void;
}
