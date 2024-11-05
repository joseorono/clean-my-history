import type { QueryFunctionContext } from "@tanstack/react-query";

export function panicQueryFn() {
  // Llama a varias funciones de promesas que se tarden un poquito y no hace resolve hasta que todas corran.
}
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
