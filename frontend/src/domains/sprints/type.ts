export interface CreateSprintInput {
  name: string;
  duration?: number;
  start_at: Date;
  end_at: Date;
  goal?: String;
  team_id?: number;
}

export interface CompleteSprintInput {
  id: number;
  isCompleted: boolean;
  destination?: number;
  unCompletedTasksIds: number[];
  totalTasksCounter?: number;
}

export enum SprintStatusEnum {
  Pending = 1,
  Ongoing = 2,
  Done = 3,
}
