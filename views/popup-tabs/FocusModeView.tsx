import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";



import { sendNotification } from "~lib/notification";
import { getRandomElement } from "~lib/utils";
import { addTodo, completeSession, deleteTodo, pauseTimer, resetTimer, startTimer, switchMode, tick, toggleTodo, type TimerMode } from "~store/features/focus/focusSlice";
import type { RootState } from "~store/store";



import { breakEncouragementMessages, focusEncouragementMessages } from "../../constants";


const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const getModeLabel = (mode: TimerMode): string => {
  switch (mode) {
    case "work":
      return "Deep Work";
    case "shortBreak":
      return "Short Break";
    case "longBreak":
      return "Long Break";
  }
};

const getModeColor = (mode: TimerMode): string => {
  switch (mode) {
    case "work":
      return "#ef5350";
    case "shortBreak":
      return "#66bb6a";
    case "longBreak":
      return "#42a5f5";
  }
};

export default function FocusModeView() {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.focus);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    if (focus.timerStatus === "running") {
      const interval = setInterval(() => {
        if (focus.timeRemaining > 0) {
          dispatch(tick());
        } else {
          dispatch(completeSession());
          const nextMode = focus.timerMode === "work" ? "break" : "work";
          const message =
            nextMode === "work"
              ? getRandomElement(focusEncouragementMessages)
              : getRandomElement(breakEncouragementMessages);
          sendNotification(0, message);
          toast.success(message);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [focus.timerStatus, focus.timeRemaining, focus.timerMode, dispatch]);

  const handleStart = () => {
    dispatch(startTimer());
    if (focus.timerMode === "work") {
      sendNotification(0, "🎯 Deep Work session started! Stay focused.");
      toast.success("Deep Work session started!");
    } else {
      sendNotification(0, "☕ Break time! Relax and recharge.");
      toast.success("Break time started!");
    }
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const handleModeSwitch = (mode: TimerMode) => {
    dispatch(switchMode(mode));
  };

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText.trim()));
      setNewTodoText("");
    }
  };

  const totalDuration = focus.settings[
    `${focus.timerMode}Duration` as keyof typeof focus.settings
  ] as number;
  const progress =
    ((totalDuration - focus.timeRemaining) / totalDuration) * 100;
  const modeColor = getModeColor(focus.timerMode);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Focus Mode
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Stay productive with the Pomodoro technique
        </Typography>
      </Box>

      {/* Mode Selector */}
      <Stack
        direction="row"
        spacing={1}
        sx={{ mb: 3, justifyContent: "center" }}>
        <Chip
          label="Deep Work"
          onClick={() => handleModeSwitch("work")}
          color={focus.timerMode === "work" ? "error" : "default"}
          variant={focus.timerMode === "work" ? "filled" : "outlined"}
        />
        <Chip
          label="Short Break"
          onClick={() => handleModeSwitch("shortBreak")}
          color={focus.timerMode === "shortBreak" ? "success" : "default"}
          variant={focus.timerMode === "shortBreak" ? "filled" : "outlined"}
        />
        <Chip
          label="Long Break"
          onClick={() => handleModeSwitch("longBreak")}
          color={focus.timerMode === "longBreak" ? "primary" : "default"}
          variant={focus.timerMode === "longBreak" ? "filled" : "outlined"}
        />
      </Stack>

      {/* Timer Display */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            {/* Circular Progress */}
            <Box sx={{ position: "relative", display: "inline-flex" }}>
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  border: `8px solid ${modeColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -8,
                    left: -8,
                    right: -8,
                    bottom: -8,
                    borderRadius: "50%",
                    background: `conic-gradient(${modeColor} ${progress}%, transparent ${progress}%)`,
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))"
                  }
                }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {formatTime(focus.timeRemaining)}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {focus.sessionsCompleted} of{" "}
                  {focus.settings.sessionsUntilLongBreak} sessions
                </Typography>
              </Box>
            </Box>

            {/* Current Mode Label */}
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {getModeLabel(focus.timerMode)}
            </Typography>

            {/* Control Buttons */}
            <Stack direction="row" spacing={2}>
              {focus.timerStatus === "running" ? (
                <IconButton
                  onClick={handlePause}
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: modeColor,
                    color: "white",
                    "&:hover": {
                      backgroundColor: modeColor,
                      opacity: 0.9
                    }
                  }}>
                  <PauseIcon sx={{ fontSize: 32 }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleStart}
                  sx={{
                    width: 64,
                    height: 64,
                    backgroundColor: modeColor,
                    color: "white",
                    "&:hover": {
                      backgroundColor: modeColor,
                      opacity: 0.9
                    }
                  }}>
                  <PlayArrowIcon sx={{ fontSize: 32 }} />
                </IconButton>
              )}
              <IconButton
                onClick={handleReset}
                sx={{
                  width: 64,
                  height: 64,
                  border: `2px solid ${modeColor}`,
                  color: modeColor
                }}>
                <RestartAltIcon sx={{ fontSize: 28 }} />
              </IconButton>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Todo List */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Tasks
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              size="small"
              placeholder="Add a task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              fullWidth
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTodo}
              sx={{ whiteSpace: "nowrap" }}>
              Add
            </Button>
          </Stack>

          <Stack spacing={1}>
            {focus.todos.length === 0 ? (
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ textAlign: "center", py: 2 }}>
                No tasks yet. Add one to get started!
              </Typography>
            ) : (
              focus.todos.map((todo) => (
                <Box
                  key={todo.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)"
                    }
                  }}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(toggleTodo(todo.id))}
                    sx={{ mr: 1 }}>
                    {todo.completed ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      flex: 1,
                      textDecoration: todo.completed ? "line-through" : "none",
                      opacity: todo.completed ? 0.6 : 1
                    }}>
                    {todo.text}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    sx={{ color: "error.main" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}