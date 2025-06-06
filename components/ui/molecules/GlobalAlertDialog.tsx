"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useAlertDialogStore } from "@/stores/store-components/useAlertDialogStore";

export function GlobalAlertDialog() {
  const {
    open,
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    close,
  } = useAlertDialogStore();

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    close();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    close();
  };

  return (
    <AlertDialog open={open} onOpenChange={close}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {onCancel && (
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
