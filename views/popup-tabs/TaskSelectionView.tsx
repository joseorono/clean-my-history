import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

import type { RootState } from "~store/store";

interface TaskSelectionViewProps {
  onTaskSelect: (taskId: string) => void;
  onTimerClick: () => void;
}

export default function TaskSelectionView({
  onTaskSelect,
  onTimerClick
}: TaskSelectionViewProps) {
  const focus = useSelector((state: RootState) => state.focus);
  const activeTasks = focus.todos.filter((todo) => !todo.completed);
  const currentTaskId = focus.currentTaskId;

  return (
    <Box
      sx={{
        p: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default"
      }}>
      {/* Header with Tasks title and Timer button */}
      <Stack
        direction="row"
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: "center"
        }}>
        <Typography
          variant="h5"
          sx={{
            color: "text.primary",
            fontWeight: 500,
            fontSize: "1.5rem"
          }}>
          Tasks
        </Typography>
        <Button
          size="small"
          onClick={onTimerClick}
          endIcon={<ArrowForwardIcon sx={{ fontSize: 24 }} />}
          sx={{
            color: "text.secondary",
            textTransform: "none",
            fontSize: "0.875rem",
            px: 1.5,
            py: 0.5,
            minWidth: "auto",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            }
          }}>
          Timer
        </Button>
      </Stack>

      {/* Task List */}
      <Stack spacing={1.5} sx={{ flex: 1, overflow: "auto" }}>
        {activeTasks.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "text.secondary"
            }}>
            <Typography variant="body2">No tasks available</Typography>
          </Box>
        ) : (
          activeTasks.map((task) => {
            const isSelected = task.id === currentTaskId;
            return (
              <Button
                key={task.id}
                onClick={() => onTaskSelect(task.id)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  px: 2.5,
                  py: 1.5,
                  border: isSelected
                    ? "2px solid rgba(66, 165, 245, 0.8)"
                    : "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: 2,
                  backgroundColor: isSelected
                    ? "rgba(66, 165, 245, 0.15)"
                    : "rgba(255, 255, 255, 0.05)",
                  color: "text.primary",
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: isSelected ? 500 : 400,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "rgba(66, 165, 245, 0.25)"
                      : "rgba(255, 255, 255, 0.12)",
                    borderColor: isSelected
                      ? "rgba(66, 165, 245, 1)"
                      : "rgba(255, 255, 255, 0.3)"
                  }
                }}>
                {task.text}
              </Button>
            );
          })
        )}
      </Stack>
    </Box>
  );
}
