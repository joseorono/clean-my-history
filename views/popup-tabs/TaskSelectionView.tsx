import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FOCUS_VIEW_TRANSITION_DURATION } from "~constants";
import {
  addTask,
  deleteTask,
  setCurrentTaskIndex,
  updateTask
} from "~store/features/focus/focusSlice";
import type { RootState } from "~store/store";

interface TaskSelectionViewProps {
  onTaskSelect: (taskIndex: number) => void;
  onTimerClick: () => void;
}

export default function TaskSelectionView({
  onTaskSelect,
  onTimerClick
}: TaskSelectionViewProps) {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.focus);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskPoms, setNewTaskPoms] = useState("1");
  const activeTasks = focus.tasks.filter((task) => !task.completed);
  const currentTaskIndex = focus.currentTaskIndex;

  const handleAddTask = () => {
    if (newTaskName.trim() && parseInt(newTaskPoms) > 0) {
      dispatch(
        addTask({
          name: newTaskName.trim(),
          pomsExpected: parseInt(newTaskPoms)
        })
      );
      setNewTaskName("");
      setNewTaskPoms("1");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleComplete = (taskId: string, completed: boolean) => {
    dispatch(updateTask({ id: taskId, updates: { completed: !completed } }));
  };

  return (
    <Fade in timeout={FOCUS_VIEW_TRANSITION_DURATION}>
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

        {/* Add Task Form */}
        <Box
          id="add-task-form"
          sx={{
            mb: 2,
            p: 2,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.05)"
          }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              color: "text.secondary",
              fontSize: "0.75rem",
              fontWeight: 600,
              mb: 1,
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
            Add New Task
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-end" }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  fontSize: "0.7rem",
                  mb: 0.5
                }}>
                Task Name
              </Typography>
              <TextField
                size="small"
                placeholder="e.g., Design mockups"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.875rem"
                  }
                }}
              />
            </Box>
            <Box sx={{ width: 90 }}>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  fontSize: "0.7rem",
                  mb: 0.5
                }}>
                Pomodoros
              </Typography>
              <TextField
                size="small"
                type="number"
                placeholder="1"
                value={newTaskPoms}
                onChange={(e) => setNewTaskPoms(e.target.value)}
                fullWidth
                inputProps={{ min: 1 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fontSize: "0.875rem"
                  }
                }}
              />
            </Box>
            <IconButton
              onClick={handleAddTask}
              color="primary"
              disabled={!newTaskName.trim() || parseInt(newTaskPoms) <= 0}
              sx={{
                mb: 0.5
              }}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Box>

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
            activeTasks.map((task, index) => {
              const taskIndex = focus.tasks.findIndex((t) => t.id === task.id);
              const isSelected = taskIndex === currentTaskIndex;
              return (
                <Stack
                  key={task.id}
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                    px: 2,
                    py: 1.5,
                    border: isSelected
                      ? "2px solid rgba(66, 165, 245, 0.8)"
                      : "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: 2,
                    backgroundColor: isSelected
                      ? "rgba(66, 165, 245, 0.15)"
                      : "rgba(255, 255, 255, 0.05)",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? "rgba(66, 165, 245, 0.25)"
                        : "rgba(255, 255, 255, 0.12)"
                    }
                  }}
                  onClick={() => onTaskSelect(taskIndex)}>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComplete(task.id, task.completed);
                    }}>
                    {task.completed ? (
                      <CheckCircleIcon fontSize="small" color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    )}
                  </IconButton>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.primary",
                        fontWeight: isSelected ? 500 : 400,
                        textDecoration: task.completed ? "line-through" : "none"
                      }}>
                      {task.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {task.pomsTaken} / {task.pomsExpected} pomodoros
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task.id);
                    }}
                    sx={{ color: "text.secondary" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              );
            })
          )}
        </Stack>
      </Box>
    </Fade>
  );
}
