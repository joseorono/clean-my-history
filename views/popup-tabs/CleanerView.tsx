import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

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

export default function CleanerView() {
  // We'll just use a single function for now to test if the component works
  const [debugMessage, setDebugMessage] = useState<string>("");

  const handleCleanHistory = async () => {
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
        {/* <Typography variant="h5" component="h1" gutterBottom>
          Clean Browser Data, Tabs, Cookies, and Cache
        </Typography> */}

        {/* Debug message */}
        {debugMessage && (
          <Box className="mb-4 rounded border border-gray-700 bg-gray-800 p-2">
            <Typography variant="body2">{debugMessage}</Typography>
          </Box>
        )}

        {/* Just one button for testing */}
        <Box className="mb-4 rounded border border-gray-700 bg-gray-800 p-4">
          <Typography variant="h6" gutterBottom>
            Delete all your browsing history, cookies, cache, and tabs
          </Typography>
          <Typography variant="body2" className="mb-3 text-gray-400">
            This will delete all your browsing history, cookies, cache, and tabs
          </Typography>
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
