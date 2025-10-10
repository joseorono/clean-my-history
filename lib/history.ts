import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const cleanAllHistory = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await chrome.history.deleteAll();
  toast.success("History Deleted Successfully!");
};

export const useCleanHistoryMutation = () => {
  return useMutation({
    mutationFn: cleanAllHistory,
    onSuccess: () => {
      toast.success("History Deleted Successfully!");
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error deleting history: ${message}`);
    }
  });
};
