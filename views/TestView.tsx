import { Task } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

import StoreTest from "~components/store-test";
import TaskButton from "~components/task-button";
import { allBadKeywords } from "~constants";
import { cleanAllHistory } from "~lib/history";
import { closeTabsWithKeywords } from "~lib/tabs";

export default function TestView() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h2">Test View 0.1</Typography>

        <StoreTest />

        <Stack spacing={2} direction="column">
          <Button variant="contained">Clean Favorites</Button>
          <Button variant="contained" onClick={async () => cleanAllHistory()}>
            Clean History
          </Button>
          <Button
            variant="contained"
            onClick={async () => closeTabsWithKeywords(allBadKeywords)}>
            Close Tabs
          </Button>
        </Stack>

        <Button onClick={() => toast.success("Test Succesful!")}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error("Error Test Succesful!")}>
          Error Toast
        </Button>
        <TaskButton
          text="Test Task Button"
          fnQuery={() => cleanAllHistory()}
          variant="contained"
          successText="Task Completed"
          errorText="Task Failed"
        />
      </Box>
    </QueryClientProvider>
  );
}
