import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import toast, { Toaster } from "react-hot-toast"

import StoreTest from "~components/store-test"

export default function TestView() {
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h2">Test View 0.1</Typography>

        <StoreTest />

        <Stack spacing={2} direction="column">
          <Button variant="contained">Clean Favorites</Button>
          <Button variant="contained">Clean History</Button>
          <Button variant="contained">Close Tabs</Button>
        </Stack>

        <Button onClick={() => toast.success("Test Succesful!")}>
          Success Toast
        </Button>
        <Button onClick={() => toast.error("Error Test Succesful!")}>
          Error Toast
        </Button>
      </Box>
    </>
  )
}
