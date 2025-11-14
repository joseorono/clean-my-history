import { gamingKeywords, nsfwKeywords, socialMediaKeywords } from "~constants";
import type { SettingsState } from "~store/features/settings/settingsSlice";

/**
 * Utility function to generate keywords array based on selected categories and custom keywords
 * @param settings - The settings state containing selected categories and custom keywords
 * @returns Array of keywords to filter tabs
 */
export const useGetKeywordsFromSettings = (
  settings: SettingsState
): string[] => {
  const selectedKeywords: string[] = [];

  // Add keywords from selected categories
  if (settings.selectedCategories.includes("nsfw")) {
    selectedKeywords.push(...nsfwKeywords);
  }

  if (settings.selectedCategories.includes("social")) {
    selectedKeywords.push(...socialMediaKeywords);
  }

  if (settings.selectedCategories.includes("gaming")) {
    selectedKeywords.push(...gamingKeywords);
  }

  // Add custom keywords
  if (settings.customKeywords.length > 0) {
    selectedKeywords.push(...settings.customKeywords);
  }

  return selectedKeywords;
};
