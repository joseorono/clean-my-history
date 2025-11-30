import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TimerMode = "work" | "shortBreak" | "longBreak";
export type TimerStatus = "idle" | "running" | "paused";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface FocusState {
  timerMode: TimerMode;
  timerStatus: TimerStatus;
  timeRemaining: number;
  sessionsCompleted: number;
  currentSessionStartTime: number | null;
  currentTaskId: string | null;
  todos: Todo[];
  settings: {
    workDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    sessionsUntilLongBreak: number;
  };
}

const initialState: FocusState = {
  timerMode: "work",
  timerStatus: "idle",
  timeRemaining: 25 * 60,
  sessionsCompleted: 0,
  currentSessionStartTime: null,
  currentTaskId: null,
  todos: [
    {
      id: "1",
      text: "Task 1",
      completed: false,
      createdAt: Date.now() - 3000
    },
    {
      id: "2",
      text: "Task 2",
      completed: false,
      createdAt: Date.now() - 2000
    },
    {
      id: "3",
      text: "Task 3",
      completed: false,
      createdAt: Date.now() - 1000
    }
  ],
  settings: {
    workDuration: 25 * 60,
    shortBreakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
    sessionsUntilLongBreak: 4
  }
};

export const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    initializeFromStorage: (
      state,
      action: PayloadAction<{ focus?: Partial<FocusState> }>
    ) => {
      if (action.payload?.focus) {
        const savedFocus = action.payload.focus;
        if (savedFocus.todos !== undefined) {
          // If saved todos is empty and we have mock data, keep the mock data
          if (savedFocus.todos.length === 0 && state.todos.length > 0) {
            // Keep the initial mock tasks
          } else {
            state.todos = savedFocus.todos;
          }
        }
        if (savedFocus.sessionsCompleted !== undefined) {
          state.sessionsCompleted = savedFocus.sessionsCompleted;
        }
        if (savedFocus.settings) {
          state.settings = { ...state.settings, ...savedFocus.settings };
        }
        // Restore timer state
        if (savedFocus.timerStatus !== undefined) {
          state.timerStatus = savedFocus.timerStatus;
        }
        if (savedFocus.timerMode !== undefined) {
          state.timerMode = savedFocus.timerMode;
        }
        if (savedFocus.timeRemaining !== undefined) {
          state.timeRemaining = savedFocus.timeRemaining;
        }
        if (savedFocus.currentSessionStartTime !== undefined) {
          state.currentSessionStartTime = savedFocus.currentSessionStartTime;
        }
        if (savedFocus.currentTaskId !== undefined) {
          state.currentTaskId = savedFocus.currentTaskId;
        }
      }
    },

    startTimer: (state) => {
      state.timerStatus = "running";
      if (state.currentSessionStartTime === null) {
        state.currentSessionStartTime = Date.now();
      }
    },

    pauseTimer: (state) => {
      state.timerStatus = "paused";
    },

    resetTimer: (state) => {
      state.timerStatus = "idle";
      state.currentSessionStartTime = null;
      const duration =
        state.settings[
          `${state.timerMode}Duration` as keyof typeof state.settings
        ];
      state.timeRemaining = duration as number;
    },

    tick: (state) => {
      if (state.timerStatus === "running" && state.timeRemaining > 0) {
        state.timeRemaining -= 1;
      }
    },

    completeSession: (state) => {
      if (state.timerMode === "work") {
        state.sessionsCompleted += 1;
        const shouldTakeLongBreak =
          state.sessionsCompleted % state.settings.sessionsUntilLongBreak === 0;
        state.timerMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
        state.timeRemaining = shouldTakeLongBreak
          ? state.settings.longBreakDuration
          : state.settings.shortBreakDuration;
      } else {
        state.timerMode = "work";
        state.timeRemaining = state.settings.workDuration;
      }
      state.timerStatus = "idle";
      state.currentSessionStartTime = null;
    },

    switchMode: (state, action: PayloadAction<TimerMode>) => {
      state.timerMode = action.payload;
      state.timerStatus = "idle";
      state.currentSessionStartTime = null;
      const duration =
        state.settings[
          `${action.payload}Duration` as keyof typeof state.settings
        ];
      state.timeRemaining = duration as number;
    },

    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
        createdAt: Date.now()
      };
      state.todos.push(newTodo);
    },

    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
      if (state.currentTaskId === action.payload) {
        state.currentTaskId = null;
      }
    },

    setCurrentTask: (state, action: PayloadAction<string | null>) => {
      state.currentTaskId = action.payload;
    },

    updateSettings: (
      state,
      action: PayloadAction<Partial<FocusState["settings"]>>
    ) => {
      state.settings = { ...state.settings, ...action.payload };
      if (state.timerStatus === "idle") {
        const duration =
          state.settings[
            `${state.timerMode}Duration` as keyof typeof state.settings
          ];
        state.timeRemaining = duration as number;
      }
    }
  }
});

export const {
  initializeFromStorage,
  startTimer,
  pauseTimer,
  resetTimer,
  tick,
  completeSession,
  switchMode,
  addTodo,
  toggleTodo,
  deleteTodo,
  setCurrentTask,
  updateSettings
} = focusSlice.actions;

export default focusSlice.reducer;
