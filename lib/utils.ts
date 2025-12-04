import type { BadKeywordCategory } from "../constants";

export function openOnboardingTab() {
  chrome.tabs.create({ url: "/static/onboarding.html" });
}

export function formatCategoryLabel(category: BadKeywordCategory): string {
  if (category === "nsfw") {
    return "NSFW";
  }
  const firstLetter: string = category.charAt(0).toUpperCase();
  const rest: string = category.slice(1);
  return `${firstLetter}${rest}`;
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
