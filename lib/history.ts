export const cleanAllHistory = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await chrome.history.deleteAll();
};
