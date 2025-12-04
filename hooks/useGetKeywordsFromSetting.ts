import { CATEGORY_KEYWORDS } from "~constants";
import type { BadKeyboardCategory } from "~constants";
import type { SettingsState } from "~store/features/settings/settingsSlice";

/**
 * Utility function to generate keywords array based on selected categories and custom keywords
 * Filters out keywords that match whitelisted domains
 * @param settings - The settings state containing selected categories, custom keywords, and whitelisted domains
 * @returns Array of keywords to filter tabs, excluding whitelisted domains
 */
export const useGetKeywordsFromSettings = (
  settings: SettingsState
): string[] => {
  const selectedKeywords: string[] = [];

  // Add keywords from selected categories using the CATEGORY_KEYWORDS mapping
  settings.selectedCategories.forEach((category) => {
    const categoryKeywords = CATEGORY_KEYWORDS[category as BadKeyboardCategory];
    if (categoryKeywords) {
      selectedKeywords.push(...categoryKeywords);
    }
  });

  // Add custom keywords
  if (settings.customKeywords.length > 0) {
    selectedKeywords.push(...settings.customKeywords);
  }

  // Filter out keywords that match whitelisted domains
  const filteredKeywords = selectedKeywords.filter((keyword) => {
    return !settings.whitelistedDomains.some((domain) =>
      keyword.toLowerCase().includes(domain.toLowerCase())
    );
  });

  return filteredKeywords;
};
