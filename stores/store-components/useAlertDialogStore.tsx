// stores/useAlertDialog.ts
import { create } from "zustand";

type AlertDialogState = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  show: (params: {
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
  }) => void;
  close: () => void;
};

export const useAlertDialogStore = create<AlertDialogState>((set) => ({
  open: false,
  title: "",
  description: "",
  confirmText: "Confirmar",
  cancelText: "Cancelar",
  onConfirm: undefined,
  onCancel: undefined,
  show: ({
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
  }) =>
    set({
      open: true,
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
    }),
  close: () => set({ open: false }),
}));
