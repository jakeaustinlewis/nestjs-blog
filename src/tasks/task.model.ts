export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Done = 'Done',
}
