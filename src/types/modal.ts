export interface ModalOptions {
  content: string;
  icon?: React.ReactNode;
  buttonCount?: 1 | 2;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface ModalState {
  options: ModalOptions | null;
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
  setLoading: (isLoading: boolean) => void;
}
