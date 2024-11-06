import toast, { Toaster } from "react-hot-toast";

export const cleanAllHistory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await chrome.history.deleteAll();
  toast.success("History Deleted Successfully!");
  return true;
};
