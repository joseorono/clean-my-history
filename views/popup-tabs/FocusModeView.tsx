import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StopIcon from "@mui/icons-material/Stop";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";



import { Storage } from "@plasmohq/storage";



import ViewContainer from "~components/view-container";
import { breakEncouragementMessages, FOCUS_VIEW_TRANSITION_DURATION, focusEncouragementMessages } from "~constants";
import { sendNotification } from "~lib/notification";
import { getRandomElement } from "~lib/utils";
import { completeSession, pauseTimer, resetTimer, setCurrentTaskIndex, startTimer, switchMode, tick, updateTask } from "~store/features/focus/focusSlice";
import type { RootState } from "~store/store";
import type { TimerMode } from "~types/focus";



import ViewHeader from "../../components/view-header";
import TaskSelectionView from "./TaskSelectionView";

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

// Create storage instance outside component to avoid re-creation on every render
const storage = new Storage();

export default function FocusModeView() {
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.focus);
  const [newTodoText, setNewTodoText] = useState("");
  const [autoBreak, setAutoBreak] = useState(false);
  const [showTaskSelection, setShowTaskSelection] = useState(false);

  // Watch for storage changes from background timer
  useEffect(() => {
    // Set up storage watcher once on mount
    storage.watch({
      reduxState: (change) => {
        if (change.newValue?.focus) {
          // Dispatch action to update Redux state from storage
          dispatch({
            type: "focus/initializeFromStorage",
            payload: change.newValue
          });
        }
      }
    });

    // No cleanup needed - Plasmo storage watchers are persistent
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const handleStart = () => {
    // Prevent starting if already running
    if (focus.timerStatus === "running") {
      return;
    }

    // Prevent starting if time is zero
    if (focus.timeRemaining === 0) {
      toast.error("Please reset the timer before starting.");
      return;
    }

    // Dispatch Redux action immediately for instant UI feedback
    dispatch(startTimer());

    // Show toast immediately (non-blocking)
    if (focus.timerMode === "work") {
      toast.success("Deep Work session started!");
    } else {
      toast.success("Break time started!");
    }

    // Send notification asynchronously (non-blocking, runs in background)
    if (focus.timerMode === "work") {
      sendNotification(0, "🎯 Deep Work session started! Stay focused.").catch(
        (err) => {
          console.error("Notification error:", err);
        }
      );
    } else {
      sendNotification(0, "☕ Break time! Relax and recharge.").catch((err) => {
        console.error("Notification error:", err);
      });
    }
  };

  const handlePause = () => {
    dispatch(pauseTimer());
  };

  const handleReset = () => {
    dispatch(resetTimer());
  };

  const handleModeSwitch = (mode: TimerMode) => {
    // Prevent mode switching when timer is running
    if (focus.timerStatus === "running") {
      toast.error("Please pause or reset the timer before switching modes.");
      return;
    }
    dispatch(switchMode(mode));
  };

  const handleTaskSelect = (taskIndex: number) => {
    dispatch(setCurrentTaskIndex(taskIndex));
    setShowTaskSelection(false);
  };

  const handleShowTaskSelection = () => {
    setShowTaskSelection(true);
  };

  const handleBackToTimer = () => {
    setShowTaskSelection(false);
  };

  const handleSwitchTask = () => {
    const activeTasks = focus.tasks.filter((task) => !task.completed);
    if (activeTasks.length === 0) return;

    const currentTaskId = focus.tasks[focus.currentTaskIndex]?.id;
    const currentActiveIndex = activeTasks.findIndex(
      (task) => task.id === currentTaskId
    );

    const nextActiveIndex =
      currentActiveIndex === -1
        ? 0
        : (currentActiveIndex + 1) % activeTasks.length;
    const nextTask = activeTasks[nextActiveIndex];
    const nextTaskIndex = focus.tasks.findIndex(
      (task) => task.id === nextTask.id
    );

    dispatch(setCurrentTaskIndex(nextTaskIndex));
  };

  const handleDoneTask = () => {
    const currentTask = focus.tasks[focus.currentTaskIndex];
    if (currentTask) {
      dispatch(
        updateTask({ id: currentTask.id, updates: { completed: true } })
      );
      // Switch to next task if available
      const activeTasks = focus.tasks.filter((task) => !task.completed);
      if (activeTasks.length > 0) {
        const nextTask = activeTasks[0];
        const nextTaskIndex = focus.tasks.findIndex(
          (task) => task.id === nextTask.id
        );
        dispatch(setCurrentTaskIndex(nextTaskIndex));
      }
    }
  };

  const totalDuration = focus.settings[
    `${focus.timerMode}Duration` as keyof typeof focus.settings
  ] as number;
  const progress =
    ((totalDuration - focus.timeRemaining) / totalDuration) * 100;
  const modeColor = getModeColor(focus.timerMode);

  // Show task selection view if active
  if (showTaskSelection) {
    return (
      <TaskSelectionView
        onTaskSelect={handleTaskSelect}
        onTimerClick={handleBackToTimer}
      />
    );
  }

  const currentTask = focus.tasks[focus.currentTaskIndex];

  return (
    <Fade in timeout={FOCUS_VIEW_TRANSITION_DURATION}>
      <ViewContainer>
        {/* Current Task Title and Change Button */}
        <Box
          id="focus-mode-top-bar"
          sx={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(12px)",
            borderRadius: 3,
            border: "1px solid rgba(255, 255, 255, 0.08)",
            p: 2,
            mb: 2,
            mx: 1
          }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1
            }}>
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  display: "block",
                  mb: 0.5,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase"
                }}>
                Current Focus
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  lineHeight: 1.2
                }}>
                {focus.tasks.filter((task) => !task.completed).length === 0
                  ? "Add a task to get started"
                  : currentTask?.name || "No task selected"}
              </Typography>
            </Box>
            <IconButton
              onClick={handleShowTaskSelection}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)"
                }
              }}>
              <SwapHorizIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>

          {/* Pomodoro Cycles Indicator */}
          <Stack
            id="pomodoro-cycles"
            direction="row"
            sx={{
              justifyContent: "start",
              alignItems: "center",
              gap: 0.5
            }}>
            {Array.from({ length: focus.settings.sessionsUntilLongBreak }).map(
              (_, index) => {
                const isCompleted = index < focus.sessionsCompleted;
                return (
                  <Box
                    key={index}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: isCompleted ? modeColor : "rgba(255, 255, 255, 0.1)",
                      transition: "all 0.3s ease",
                      boxShadow: isCompleted ? `0 0 8px ${modeColor}` : "none"
                    }}
                  />
                );
              }
            )}
          </Stack>
        </Box>

        {/* Mode Selector */}
        <Stack
          id="modeSelectorBottons"
          direction="row"
          spacing={1}
          sx={{
            mb: 4,
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            p: 0.5,
            borderRadius: "9999px",
            width: "fit-content",
            mx: "auto"
          }}>
          {[
            { id: "work", label: "Deep Work", color: "#ef5350" },
            { id: "shortBreak", label: "Short", color: "#66bb6a" },
            { id: "longBreak", label: "Long", color: "#42a5f5" }
          ].map((mode) => (
            <Box
              key={mode.id}
              onClick={() => handleModeSwitch(mode.id as TimerMode)}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: "9999px",
                cursor: "pointer",
                backgroundColor: focus.timerMode === mode.id ? "rgba(255, 255, 255, 0.1)" : "transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: focus.timerMode === mode.id ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)"
                }
              }}>
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: focus.timerMode === mode.id ? mode.color : "text.secondary",
                  transition: "color 0.2s ease"
                }}>
                {mode.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Timer Display with Circular Progress */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            position: "relative"
          }}>
          <Box sx={{ position: "relative", display: "inline-flex", mb: 4 }}>
            {/* Circular Progress Ring */}
            <svg
              width="260"
              height="260"
              style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 20px ${modeColor}40)` }}>
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={modeColor} />
                  <stop offset="100%" stopColor={modeColor} stopOpacity="0.8" />
                </linearGradient>
              </defs>
              {/* Background circle */}
              <circle
                cx="130"
                cy="130"
                r="120"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="130"
                cy="130"
                r="120"
                fill="none"
                stroke="url(#timerGradient)"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 120}`}
                strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>

            {/* Timer text in center */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 200,
                  fontSize: "4.5rem",
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                  fontFamily: "'Roboto', sans-serif",
                  lineHeight: 1
                }}>
                {formatTime(focus.timeRemaining)}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: modeColor,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.8rem",
                  mt: 1
                }}>
                {getModeLabel(focus.timerMode)}
              </Typography>
            </Box>
          </Box>

          {/* Control Buttons below timer */}
          <Stack direction="row" spacing={3} alignItems="center">
            {/* Stop button */}
            <IconButton
              onClick={handleReset}
              sx={{
                width: 56,
                height: 56,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                color: "text.secondary",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#ef5350",
                  transform: "translateY(-2px)"
                }
              }}>
              <StopIcon sx={{ fontSize: 28 }} />
            </IconButton>

            {/* Play/Pause button */}
            <IconButton
              onClick={focus.timerStatus === "running" ? handlePause : handleStart}
              sx={{
                width: 80,
                height: 80,
                backgroundColor: modeColor,
                color: "white",
                boxShadow: `0 8px 32px ${modeColor}60`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 40px ${modeColor}80`
                }
              }}>
              {focus.timerStatus === "running" ? (
                <PauseIcon sx={{ fontSize: 40 }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>

            {/* Skip/Next button (Placeholder for symmetry or future feature, maybe skip break?) */}
            {/* Using a transparent spacer or keeping it minimal for now.
                 Actually, let's add the Reset/Switch logic here instead of bottom.
                 Wait, the design has Switch Task below. Let's keep it clean.
                 Maybe a "Skip" button for breaks? Or just keep it balanced with 2 buttons?
                 Let's stick to the main controls.
             */}
          </Stack>
        </Box>

        {/* Done and Switch Task buttons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ mb: 2, justifyContent: "center" }}>
          <Button
            variant="outlined"
            startIcon={<CheckIcon />}
            onClick={handleDoneTask}
            sx={{
              color: "text.primary",
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }
            }}>
            Done
          </Button>
          <Button
            variant="outlined"
            startIcon={<SwapHorizIcon />}
            onClick={handleSwitchTask}
            sx={{
              color: "text.secondary",
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.2)",
                backgroundColor: "rgba(255, 255, 255, 0.05)"
              }
            }}>
            Switch
          </Button>
        </Stack>

        {/* Reset Session button at bottom */}
        <Box
          sx={{
            pt: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <Typography
            variant="caption"
            color="textSecondary"
            sx={{
              fontSize: "0.75rem",
              opacity: 0.6,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}>
            <span>Session Progress:</span>
            <span style={{ color: "white", fontWeight: 600 }}>
              {focus.sessionsCompleted} / {focus.settings.sessionsUntilLongBreak}
            </span>
          </Typography>
        </Box>
      </ViewContainer>
    </Fade>
  );
}