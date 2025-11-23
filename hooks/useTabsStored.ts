import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useStorage } from "@plasmohq/storage/hook";

import { useGetKeywordsFromSettings } from "~hooks/useGetKeywordsFromSetting";
import { getAllTabs } from "~lib/tabs";
import type { SettingsState } from "~store/features/settings/settingsSlice";
import type { RootState } from "~store/store";

interface UseTabsPersistedReturn {
  tabs: chrome.tabs.Tab[];
  hasTabsWithKeywords: boolean;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

export default function useTabsPersisted(): UseTabsPersistedReturn {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Persist filtered tabs to Plasmo Storage
  const [persistedTabs, setPersistedTabs] = useStorage<chrome.tabs.Tab[]>(
    "tabs_with_keywords",
    []
  );

  // Get settings from Redux store
  const settings = useSelector(
    (state: RootState) => state.settings
  ) as SettingsState;

  const fetchAllTabs = async () => {
    setIsLoading(true);
    const allTabs = await getAllTabs();
    if (allTabs) {
      setTabs(allTabs);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTabs();

    // Set up interval to check tabs with keywords every minute (60000ms)
    const intervalId = setInterval(() => {
      fetchAllTabs();
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Get keywords from settings using utility function
  const keywords = useGetKeywordsFromSettings(settings);

  const handleFilterTabsWithKeywords = () => {
    const tabsWithKeywords = tabs.filter((tab) => {
      const url = tab.url?.toLowerCase();
      return keywords.some((keyword) => url?.includes(keyword));
    });
    return tabsWithKeywords;
  };

  const tabsWithKeywords = handleFilterTabsWithKeywords();

  // Update persisted tabs whenever tabs or settings change
  useEffect(() => {
    if (tabs.length > 0) {
      setPersistedTabs(tabsWithKeywords);
    }
  }, [
    tabs,
    tabsWithKeywords,
    settings.selectedCategories,
    settings.customKeywords,
    settings.whitelistedDomains
  ]);

  return {
    tabs: persistedTabs || [],
    hasTabsWithKeywords: (persistedTabs?.length || 0) > 0,
    isLoading,
    refresh: fetchAllTabs
  };
}