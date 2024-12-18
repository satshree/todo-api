export interface Task {
  id: string;
  title: string;
  color: string;
  level: number;
  completed: boolean;
  timestamp: number;
}

export type TaskList = Task[];
