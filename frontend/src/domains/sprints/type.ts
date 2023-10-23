export enum SprintStateEnum {
  PAST = 1,
  CURRENT = 2,
  NEXT = 3,
}

export interface CreateSprintInput {
  name: string;
  duration?: number;
  start_at: Date;
  end_at: Date;
  goal?: String;
  team_id?: number;
}
