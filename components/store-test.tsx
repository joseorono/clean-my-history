import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Stack from "@mui/material/Stack"
import { styled } from "@mui/material/styles"
import TextField from "@mui/material/TextField"
import { useDispatch, useSelector } from "react-redux"

import { decrement, increment } from "~store/features/counter/counterSlice"
import type { RootState } from "~store/store"

export default function StoreTest() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <Stack direction="row" spacing={2} padding={1}>
          <Button
            variant="outlined"
            size="small"
            aria-label="Increment value"
            onClick={() => dispatch(increment())}>
            Increment
          </Button>

          <TextField
            id="outlined-read-only-input"
            label=""
            defaultValue="0"
            value={count}
            size="small"
            style={{ minWidth: "3rem", width: "3rem", textAlign: "center" }}
          />

          <Button
            variant="outlined"
            size="small"
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
        </Stack>
      </div>
    </div>
  )
}
