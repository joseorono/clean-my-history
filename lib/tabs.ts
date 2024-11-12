import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function closeTabsByIds(tabIds: number[]) {
  return new Promise((resolve) => {
    chrome.tabs.remove(tabIds, resolve);
  });
}

type tabsClosingResponse = {
  message?: string;
  tabIdsClosed: number[];
  tabsClosed: number;
};

export async function closeTabsWithKeywords(
  keywords: string[]
): Promise<tabsClosingResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return new Promise((resolve) => {
    let message = "";
    let tabIdsClosed: number[] = [];
    let tabsClosed = 0;

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        const url = tab.url?.toLowerCase();

        if (
          url &&
          keywords.some((keyword) => url.includes(keyword.toLowerCase()))
        ) {
          if (tab.id !== undefined) {
            // Logging
            if (process.env.PLASMO_PUBLIC_DEBUGGING_MODE == "true") {
              console.log("Closing tab with url:", url);
              tabIdsClosed.push(tab.id);
              tabsClosed += 1;
            }

            chrome.tabs.remove(tab.id);
          }
        }
      });
    });

    // No error found and we reached this point
    message = `Closed tabs supposedly`;
    if (process.env.PLASMO_PUBLIC_DEBUGGING_MODE == "true") {
      message += `( ${tabIdsClosed} )`;
    }

    let response: tabsClosingResponse = {
      message: message,
      tabIdsClosed: tabIdsClosed,
      tabsClosed: tabsClosed
    };

    resolve(response);
  });
}

export const useCloseTabsMutation = () => {
  return useMutation(closeTabsWithKeywords, {
    onSuccess: () => {
      toast.success("Tab's closed successfully!");
    },
    onError: (error: any) => {
      toast.error(`Error closing tab's: ${error.message}`);
    }
  });
};
