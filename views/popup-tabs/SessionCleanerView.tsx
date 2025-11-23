import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
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

  // Get focus mode state
  const focus = useSelector((state: RootState) => state.focus);

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

  // Send notification every minute only when in Focus Mode work session
  useEffect(() => {
    const shouldAutoCheck =
      focus.timerStatus === "running" && focus.timerMode === "work";

    if (!shouldAutoCheck) {
      return;
    }

    const intervalId = setInterval(() => {
      if (tabsWithKeywords.length > 0) {
        sendNotification(tabsWithKeywords.length);
      }
    }, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [tabsWithKeywords.length, focus.timerStatus, focus.timerMode]);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Session Cleaner
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Close tabs that might distract you from work
        </Typography>
      </Box>

      {/* Auto-check indicator */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
        <FiberManualRecordIcon
          sx={{
            fontSize: "0.75rem",
            color:
              focus.timerStatus === "running" && focus.timerMode === "work"
                ? "success.main"
                : "grey.600",
            animation:
              focus.timerStatus === "running" && focus.timerMode === "work"
                ? "pulse 2s infinite"
                : "none"
          }}
        />
        <Typography variant="caption" color="textSecondary">
          {focus.timerStatus === "running" && focus.timerMode === "work"
            ? "Auto-checking every minute (Focus Mode active)"
            : "Auto-check paused (Start Focus Mode to enable)"}
        </Typography>
      </Box>

      {/* Display selected categories */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Active Filters
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
            {settings.selectedCategories.map((category) => (
              <Chip
                key={category}
                label={category}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
            {settings.customKeywords.length > 0 && (
              <Chip
                label={`+${settings.customKeywords.length} custom`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
            {settings.whitelistedDomains.length > 0 && (
              <Chip
                label={`${settings.whitelistedDomains.length} whitelisted`}
                size="small"
                color="secondary"
                variant="outlined"
              />
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* Display tabs with keywords indicator */}
      {(hasTabsWithKeywords || isLoadingPersistedTabs) && (
        <Card sx={{ mb: 3, backgroundColor: "rgba(255, 193, 7, 0.1)" }}>
          <CardContent>
            <Typography variant="body2" sx={{ color: "warning.light" }}>
              ⚠️ Found {tabsWithKeywords.length} tab
              {tabsWithKeywords.length !== 1 ? "s" : ""} with distracting
              content
            </Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={3} sx={{ alignItems: "center", pt: 2 }}>
        {/* Main session cleaner button */}
        <Box
          id="quick-productivity-button"
          component="button"
          onClick={handleCleanSession}
          disabled={closeTabsMutation.isPending || isAnimating}
          sx={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            backgroundColor: "#90CAF9",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: 3,
            transition: "all 0.5s ease",
            "&:hover:not(:disabled)": {
              backgroundColor: "#64B5F6",
              boxShadow: 4
            },
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed"
            }
          }}>
          {closeTabsMutation.isPending ? (
            <CircularProgress size={32} color="primary" />
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                transition: "transform 0.3s ease",
                transform: isAnimating ? "scale(1)" : "scale(1)"
              }}>
              <rect x="2" y="4" width="18" height="14" rx="2" fill="#1a1a1a" />
              <rect x="4" y="2" width="14" height="2" rx="1" fill="#1a1a1a" />
            </svg>
          )}
        </Box>

        {/* Status text */}
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          {closeTabsMutation.isPending
            ? "Cleaning up tabs..."
            : closedTabsCount > 0
              ? `Closed ${closedTabsCount} distracting tabs`
              : `Currently open tabs: ${tabs.length}`}
        </Typography>

        {/* Test notification button */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<NotificationsIcon />}
          onClick={async () => {
            console.log("🧪 Test notification button clicked");
            toast.success("Sending test notification...");
            await sendNotification(tabsWithKeywords.length || 1);
          }}>
          Test Notification
        </Button>
      </Stack>
    </Box>
  );
}
