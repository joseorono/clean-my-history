import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const cleanAllHistory = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await chrome.history.deleteAll();
  toast.success("History Deleted Successfully!");
};

export const useCleanHistoryMutation = () => {
  return useMutation(cleanAllHistory, {
    onSuccess: () => {
      toast.success("History Deleted Successfully!");
    },
    onError: (error: any) => {
      toast.error(`Error deleting history: ${error.message}`);
    }
  });
};
