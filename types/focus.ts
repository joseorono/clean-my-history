export interface ToDoTask {
  id: string;
  name: string;
  pomsExpected: number;
  pomsTaken: number;
  completed: boolean;
  createdAt: number;
}

export type TimerMode = "work" | "shortBreak" | "longBreak";
export type TimerStatus = "idle" | "running" | "paused";
