import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
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

  const handleTimeRangeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeRange: TimeRange | null
  ): void => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  const handleCleanHistory = async (): Promise<boolean> => {
    try {
      setDebugMessage("Cleaning history...");
      await cleanAllHistory();
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
      <Box className="p-4 text-white">
        <ViewHeader
          title="History Cleaner"
          subtitle="Delete all your browsing history, cookies, cache, and tabs"
        />

        {/* Time Range Toggle Buttons */}
        <Box className="mb-6 rounded border border-gray-700 bg-gray-800 p-4">
          <Typography variant="subtitle2" className="mb-3 block text-gray-300">
            Time Range
          </Typography>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            className="flex flex-wrap gap-2"
            sx={{
              "& .MuiToggleButton-root": {
                color: "#9ca3af",
                borderColor: "#4b5563",
                "&.Mui-selected": {
                  backgroundColor: "#1e40af",
                  color: "#fff",
                  borderColor: "#1e40af",
                  "&:hover": {
                    backgroundColor: "#1e3a8a",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(30, 64, 175, 0.1)",
                },
              },
            }}>
            <ToggleButton value="15min">Last 15 min</ToggleButton>
            <ToggleButton value="1hour">Last hour</ToggleButton>
            <ToggleButton value="24hours">Last 24 hours</ToggleButton>
            <ToggleButton value="7days">Last 7 days</ToggleButton>
            <ToggleButton value="30days">Last 30 days</ToggleButton>
            <ToggleButton value="1year">Last year</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Only Matching Results Checkbox */}
        <Box className="mb-6 rounded border border-gray-700 bg-gray-800 p-4">
          <Tooltip
            title="Only delete history entries that match your configured keywords"
            arrow
            placement="top">
            <FormControlLabel
              control={
                <Checkbox
                  checked={onlyMatchingResults}
                  onChange={(e) => setOnlyMatchingResults(e.target.checked)}
                  sx={{
                    color: "#9ca3af",
                    "&.Mui-checked": {
                      color: "#1e40af",
                    },
                  }}
                />
              }
              label="Only matching results"
              sx={{
                color: "#e5e7eb",
                "& .MuiFormControlLabel-label": {
                  fontSize: "0.95rem",
                },
              }}
            />
          </Tooltip>
        </Box>

        {/* Debug message */}
        {debugMessage && (
          <Box className="mb-4 rounded border border-gray-700 bg-gray-800 p-2">
            <Typography variant="body2">{debugMessage}</Typography>
          </Box>
        )}

        {/* Just one button for testing */}
        <Box className="mb-4 rounded border border-gray-700 bg-gray-800 p-4">
          <div className="flex flex-wrap gap-4 py-4">
            <TaskButton
              text="Clear History"
              successText="History cleared successfully"
              errorText="Failed to clear history"
              fnQuery={handleCleanHistory}
              disabled={false}
            />
            <TaskButton
              text="Clear Tabs"
              successText="Tabs cleared successfully"
              errorText="Failed to clear tabs"
              fnQuery={() => {}}
              disabled={false}
            />
            <TaskButton
              text="Clear Cookies"
              successText="Cookies cleared successfully"
              errorText="Failed to clear cookies"
              fnQuery={() => {}}
              disabled={false}
            />
            <TaskButton
              text="Clear Cache"
              successText="Cache cleared successfully"
              errorText="Failed to clear cache"
              fnQuery={() => {}}
              disabled={false}
            />
          </div>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}
