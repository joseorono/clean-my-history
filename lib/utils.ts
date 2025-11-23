import type { BadKeyboardCategory } from "../constants";

export function openOnboardingTab() {
  chrome.tabs.create({ url: "/static/onboarding.html" });
}

export function formatCategoryLabel(category: BadKeyboardCategory): string {
  if (category === "nsfw") {
    return "NSFW";
  }
  const firstLetter: string = category.charAt(0).toUpperCase();
  const rest: string = category.slice(1);
  return `${firstLetter}${rest}`;
}
