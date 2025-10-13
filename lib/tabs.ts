import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function closeTabsByIds(tabIds: number[]) {
  return new Promise((resolve) => {
    chrome.tabs.remove(tabIds, resolve);
  });
}

export type tabsClosingResponse = {
  message?: string;
  tabIdsClosed: number[];
  tabsClosed: number;
};

export type CloseTabsParams = {
  keywords: string[];
  whitelistedDomains?: string[];
};

/**
 * Helper function to check if a URL is whitelisted
 */
function isUrlWhitelisted(url: string, whitelistedDomains: string[]): boolean {
  if (!whitelistedDomains || whitelistedDomains.length === 0) {
    return false;
  }

  const lowerUrl = url.toLowerCase();
  return whitelistedDomains.some((domain) => {
    const lowerDomain = domain.toLowerCase();
    // Check if the URL contains the whitelisted domain
    return lowerUrl.includes(lowerDomain);
  });
}

export async function cleanSession(
  params: CloseTabsParams
): Promise<tabsClosingResponse> {
  const { keywords = [], whitelistedDomains = [] } = params;

  // Add a small delay to simulate processing
  await new Promise((resolve) => setTimeout(resolve, 500));

  return new Promise((resolve) => {
    let message = "";
    let tabIdsClosed: number[] = [];
    let tabsClosed = 0;

    chrome.tabs.query({}, (tabs) => {
      // First, identify tabs to close
      const tabsToClose = tabs.filter((tab) => {
        const url = tab.url?.toLowerCase();

        // Skip if URL doesn't exist
        if (!url) {
          return false;
        }

        // Skip if URL is whitelisted
        if (isUrlWhitelisted(url, whitelistedDomains)) {
          return false;
        }

        // Check if URL matches any keyword
        return keywords.some((keyword) => url.includes(keyword.toLowerCase()));
      });

      // Update counts
      tabsClosed = tabsToClose.length;
      tabIdsClosed = tabsToClose
        .map((tab) => tab.id)
        .filter((id): id is number => id !== undefined);

      // Log tabs to be closed
      console.log(`Closing ${tabsClosed} tabs with matching keywords`);

      // Close the tabs if any were found
      if (tabIdsClosed.length > 0) {
        chrome.tabs.remove(tabIdsClosed);
      }

      // Prepare response message
      message = `Closed ${tabsClosed} tabs`;

      // Resolve with response
      const response: tabsClosingResponse = {
        message: message,
        tabIdsClosed: tabIdsClosed,
        tabsClosed: tabsClosed
      };

      resolve(response);
    });
  });
}

export const useCloseTabsMutation = () => {
  return useMutation({
    mutationFn: (params: CloseTabsParams) => cleanSession(params),
    onSuccess: () => {
      toast.success("Tab's closed successfully!");
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error(`Error closing tab's: ${message}`);
    }
  });
};

export async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function getAllTabs() {
  try {
    const tabs = await chrome.tabs.query({});
    return tabs;
  } catch (error) {
    console.error("Error fetching tabs:", error);
  }
}
