import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

import { useGetKeywordsFromSettings } from "~hooks/useGetKeywordsFromSetting";
import useTabsPersisted from "~hooks/useTabsStored";
import { sendNotification } from "~lib/notification";

import { getAllTabs, useCloseTabsMutation } from "../../lib/tabs";
import type { SettingsState } from "../../store/features/settings/settingsSlice";
import type { RootState } from "../../store/store";

export default function SessionCleanerView() {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [closedTabsCount, setClosedTabsCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Get settings from Redux store
  const settings = useSelector(
    (state: RootState) => state.settings
  ) as SettingsState;

  // Use the proper mutation hook
  const closeTabsMutation = useCloseTabsMutation();

  const fetchAllTabs = async () => {
    const allTabs = await getAllTabs();
    if (allTabs) {
      setTabs(allTabs);
    }
  };

  useEffect(() => {
    fetchAllTabs();
  }, []);

  // Handle the clean session action
  const handleCleanSession = () => {
    setIsAnimating(true);
    const keywords = useGetKeywordsFromSettings(settings);

    // Use the mutation to close tabs
    closeTabsMutation.mutate(
      {
        keywords,
        whitelistedDomains: settings.whitelistedDomains
      },
      {
        onSuccess: (data) => {
          setClosedTabsCount(data.tabsClosed);
          fetchAllTabs(); // Refresh tabs list
          refreshTabsCheck(); // Refresh persisted tabs check
          setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1 second
        },
        onError: () => {
          setIsAnimating(false);
        }
      }
    );
  };

  const {
    tabs: tabsWithKeywords,
    hasTabsWithKeywords,
    isLoading: isLoadingPersistedTabs,
    refresh: refreshTabsCheck
  } = useTabsPersisted();

  // Send notification every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (tabsWithKeywords.length > 0) {
        sendNotification(tabsWithKeywords.length);
      }
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [tabsWithKeywords.length]);

  return (
    <Box className="p-4 text-white">
      <Typography variant="h5" component="h1" gutterBottom>
        Session Cleaner
      </Typography>
      <p className="mb-2 text-gray-400">
        Close tabs that might distract you from work
      </p>

      {/* Auto-check indicator */}
      <Box className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
        <Typography variant="caption" className="text-gray-400">
          Auto-checking every minute
        </Typography>
      </Box>

      {/* Display selected categories */}
      <Box className="mb-4 flex flex-wrap gap-1">
        {settings.selectedCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            size="small"
            color="primary"
            variant="outlined"
            className="text-xs"
          />
        ))}
        {settings.customKeywords.length > 0 && (
          <Chip
            label={`+${settings.customKeywords.length} custom`}
            size="small"
            color="secondary"
            variant="outlined"
            className="text-xs"
          />
        )}
        {settings.whitelistedDomains.length > 0 && (
          <Chip
            label={`${settings.whitelistedDomains.length} whitelisted`}
            size="small"
            color="secondary"
            variant="outlined"
            className="text-xs"
          />
        )}
      </Box>

      {/* Display tabs with keywords indicator */}
      {(hasTabsWithKeywords || isLoadingPersistedTabs) && (
        <Box className="mb-2 rounded-md bg-yellow-900/30 p-2">
          <Typography variant="body2" className="text-yellow-200">
            ⚠️ Found {tabsWithKeywords.length} tab
            {tabsWithKeywords.length !== 1 ? "s" : ""} with distracting content
          </Typography>
        </Box>
      )}

      <div className="flex flex-col items-center gap-6 pt-4">
        {/* Main session cleaner button */}
        <button
          id="quick-productivity-button"
          className="group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#90CAF9] font-semibold shadow-lg transition-all duration-500 hover:bg-[#64B5F6] hover:shadow-xl disabled:opacity-50"
          onClick={handleCleanSession}
          disabled={closeTabsMutation.isPending || isAnimating}>
          {closeTabsMutation.isPending ? (
            <CircularProgress size={32} color="primary" />
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition-transform duration-300 ${
                isAnimating
                  ? "animate-[tabClose_0.6s_ease-in-out]"
                  : "group-hover:scale-110"
              }`}>
              <rect
                x="2"
                y="4"
                width="18"
                height="14"
                rx="2"
                className="fill-stone-800 transition-colors duration-300 group-hover:fill-[#1565C0]"
              />
              <rect
                x="4"
                y="2"
                width="14"
                height="2"
                rx="1"
                className="fill-stone-800 transition-colors duration-300 group-hover:fill-[#1565C0]"
              />
            </svg>
          )}
        </button>

        {/* Status text */}
        <p className="text-center">
          {closeTabsMutation.isPending
            ? "Cleaning up tabs..."
            : closedTabsCount > 0
            ? `Closed ${closedTabsCount} distracting tabs`
            : `Currently open tabs: ${tabs.length}`}
        </p>

        {/* Test notification button */}
        <button
          className="mt-4 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700"
          onClick={async () => {
            console.log("🧪 Test notification button clicked");
            toast.success("Sending test notification...");
            await sendNotification(tabsWithKeywords.length || 1);
          }}>
          🔔 Test Notification
        </button>
      </div>
    </Box>
  );
}
