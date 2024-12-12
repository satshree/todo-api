export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
  timestamp: number;
}

export type TaskList = Task[];
