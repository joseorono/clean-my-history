import { Storage } from "@plasmohq/storage";

import type { FocusState } from "~store/features/focus/focusSlice";

export {};

interface ReduxState {
  focus: FocusState;
  [key: string]: any;
}

console.log("Background Worker Active. You can now use the extension");

const storage = new Storage();
let timerInterval: NodeJS.Timeout | null = null;

// Background timer that persists when popup is closed
async function startBackgroundTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(async () => {
    try {
      const state = (await storage.get("reduxState")) as ReduxState | null;
      if (!state || !state.focus) return;

      const focus = state.focus;

      // Only tick if timer is running and time remaining
      if (focus.timerStatus === "running" && focus.timeRemaining > 0) {
        // Decrement time, ensuring it never goes below zero
        const newTimeRemaining = Math.max(0, focus.timeRemaining - 1);
        focus.timeRemaining = newTimeRemaining;

        // Check if session completed (reached zero)
        if (newTimeRemaining === 0) {
          await handleSessionComplete(state);
        } else {
          // Optimized: Save updated state with new time
          // This persists the countdown across popup close/reopen
          await storage.set("reduxState", state);
        }
      } else if (focus.timerStatus !== "running" && timerInterval) {
        // Stop timer if status changed
        clearInterval(timerInterval);
        timerInterval = null;
      }
    } catch (error) {
      console.error("Timer error:", error);
    }
  }, 1000);
}

async function handleSessionComplete(state: ReduxState) {
  const focus = state.focus;

  // Complete the session
  if (focus.timerMode === "work") {
    focus.sessionsCompleted += 1;
    const shouldTakeLongBreak =
      focus.sessionsCompleted % focus.settings.sessionsUntilLongBreak === 0;
    focus.timerMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
    focus.timeRemaining = shouldTakeLongBreak
      ? focus.settings.longBreakDuration
      : focus.settings.shortBreakDuration;
  } else {
    focus.timerMode = "work";
    focus.timeRemaining = focus.settings.workDuration;
  }

  focus.timerStatus = "idle";
  focus.currentSessionStartTime = null;

  // Save state
  await storage.set("reduxState", state);

  // Send notification
  const nextMode = focus.timerMode === "work" ? "work" : "break";
  const message =
    nextMode === "work"
      ? " Break complete! Ready for another Deep Work session?"
      : " Session complete! Time for a well-deserved break.";

  chrome.notifications.create({
    type: "basic",
    iconUrl: chrome.runtime.getURL("icon.png"),
    title: "FocusSpace",
    message: message,
    priority: 2
  });
}

// Watch for storage changes to start/stop timer
storage.watch({
  reduxState: (change) => {
    const timerStatus = change.newValue?.focus?.timerStatus;

    if (timerStatus === "running" && !timerInterval) {
      console.log("Starting background timer from storage watch");
      startBackgroundTimer();
    } else if (timerStatus !== "running" && timerInterval) {
      console.log("Stopping background timer from storage watch");
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
});

// Initialize timer on startup if it was running
(async () => {
  const state = (await storage.get("reduxState")) as ReduxState | null;
  if (state?.focus?.timerStatus === "running") {
    console.log("Initializing timer on startup");
    startBackgroundTimer();
  }
})();

chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    chrome.tabs.create({ url: "static/onboarding.html" });
  }
});
