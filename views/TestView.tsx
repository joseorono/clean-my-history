import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"

import { decrement, increment } from "~store/features/counter/counterSlice"
// Utilities...

// Redix Stuff
import type { RootState } from "~store/store"

export default function TestView() {
  /*
   */
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h2">Test View</Typography>

        <div>
          <div>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}>
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}>
              Decrement
            </button>
          </div>
        </div>

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
