import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import React, { useState } from "react";

import ViewHeader from "../../components/view-header";
import TaskButton from "../../components/task-button";
import { cleanAllHistory } from "../../lib/history";

// Simple error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorMessage: error?.message || "Unknown error" };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("CleanerView error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-white">
          <h2>Something went wrong</h2>
          <p className="text-red-400">{this.state.errorMessage}</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.setState({ hasError: false, errorMessage: "" })
            }>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

type TimeRange = "15min" | "1hour" | "24hours" | "7days" | "30days" | "1year";

export default function CleanerView() {
  const [debugMessage, setDebugMessage] = useState<string>("");
  const [timeRange, setTimeRange] = useState<TimeRange>("24hours");
  const [onlyMatchingResults, setOnlyMatchingResults] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMoreRange: boolean =
    timeRange === "7days" || timeRange === "30days" || timeRange === "1year";

  const handleTimeRangeChange = (newTimeRange: TimeRange): void => {
    setTimeRange(newTimeRange);
    setAnchorEl(null);
  };

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleCleanHistory = async (): Promise<boolean> => {
    try {
      setDebugMessage("Cleaning history...");
      await cleanAllHistory(timeRange);
      setDebugMessage("History cleaned successfully!");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setDebugMessage(`Error: ${errorMessage}`);
      console.error("Error cleaning history:", error);
      throw error;
    }
  };

  return (
    <ErrorBoundary>
      <div>
        <ViewHeader
          title="Browser Cleaner"
          subtitle="Delete your browser's browsing history, cookies, cache, and more."
        />
        {/* Time Range Selector */}
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ mb: 2, justifyContent: "flex-start", flexWrap: "wrap" }}>
          <Chip
            label="Last 15 min"
            onClick={() => handleTimeRangeChange("15min")}
            color={timeRange === "15min" ? "primary" : "default"}
            variant={timeRange === "15min" ? "filled" : "outlined"}
            size="small"
            sx={{ height: 24, fontSize: "0.75rem" }}
          />
          <Chip
            label="Last hour"
            onClick={() => handleTimeRangeChange("1hour")}
            color={timeRange === "1hour" ? "primary" : "default"}
            variant={timeRange === "1hour" ? "filled" : "outlined"}
            size="small"
            sx={{ height: 24, fontSize: "0.75rem" }}
          />
          <Chip
            label="Last 24 hours"
            onClick={() => handleTimeRangeChange("24hours")}
            color={timeRange === "24hours" ? "primary" : "default"}
            variant={timeRange === "24hours" ? "filled" : "outlined"}
            size="small"
            sx={{ height: 24, fontSize: "0.75rem" }}
          />
          {isMoreRange && (
            <Chip
              label={
                timeRange === "7days"
                  ? "Last 7 days"
                  : timeRange === "30days"
                    ? "Last 30 days"
                    : "Last year"
              }
              onClick={() => handleTimeRangeChange(timeRange)}
              color="primary"
              variant="filled"
              size="small"
              sx={{ height: 24, fontSize: "0.75rem" }}
            />
          )}
          <Chip
            label="More"
            onClick={handleMoreClick}
            color="default"
            variant="outlined"
            size="small"
            sx={{ height: 24, fontSize: "0.75rem" }}
          />
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}>
            <MenuItem onClick={() => handleTimeRangeChange("7days")}>
              Last 7 days
            </MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange("30days")}>
              Last 30 days
            </MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange("1year")}>
              Last year
            </MenuItem>
          </Menu>
        </Stack>

        {/* Cleaning items list */}
        <Box className="space-y-2">
          {/* Browsing History */}
          <Box className="flex items-start gap-3 rounded border border-gray-700 bg-gray-800 p-3">
            <Checkbox
              defaultChecked
              sx={{
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#1e40af",
                },
              }}
            />
            <Box className="flex-1">
              <Typography variant="subtitle2" className="font-semibold text-white">
                Browsing history
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                From github.com and 2 more sites (and more on synced devices)
              </Typography>
            </Box>
          </Box>

          {/* Cookies and site data */}
          <Box className="flex items-start gap-3 rounded border border-gray-700 bg-gray-800 p-3">
            <Checkbox
              defaultChecked
              sx={{
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#1e40af",
                },
              }}
            />
            <Box className="flex-1">
              <Typography variant="subtitle2" className="font-semibold text-white">
                Cookies and site data
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                From 147 sites. To delete Google cookies from this device, use Chrome settings.
              </Typography>
            </Box>
          </Box>

          {/* Cached images and files */}
          <Box className="flex items-start gap-3 rounded border border-gray-700 bg-gray-800 p-3">
            <Checkbox
              defaultChecked
              sx={{
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#1e40af",
                },
              }}
            />
            <Box className="flex-1">
              <Typography variant="subtitle2" className="font-semibold text-white">
                Cached images and files
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                Less than 317 MB
              </Typography>
            </Box>
          </Box>

          {/* Download history */}
          <Box className="flex items-start gap-3 rounded border border-gray-700 bg-gray-800 p-3">
            <Checkbox
              defaultChecked
              sx={{
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#1e40af",
                },
              }}
            />
            <Box className="flex-1">
              <Typography variant="subtitle2" className="font-semibold text-white">
                Download history
              </Typography>
              <Typography variant="body2" className="text-gray-400">
                None
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Debug message */}
        {debugMessage && (
          <Box className="mt-4 rounded border border-gray-700 bg-gray-800 p-2">
            <Typography variant="body2">{debugMessage}</Typography>
          </Box>
        )}

        {/* Action button */}
        <Box className="mt-2">
          <TaskButton
            text="Clear Data"
            successText="Data cleared successfully"
            errorText="Failed to clear data"
            fnQuery={handleCleanHistory}
            disabled={false}
          />
        </Box>
      </div>
    </ErrorBoundary>
  );
}
