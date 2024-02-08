import { User } from "../auth/services/types";
import { LivrableApi } from "../modules/type";
import { TaskStatusApi } from "../tasks/type";

export enum TeamVisibility {
  PRIVATE = 1,
  PUBLIC = 0,
}

export interface WorkflowApi {
  id: number;
  team_id: number;
  status_id: number;
  order_value: number;
  status: TaskStatusApi;
}

export interface TeamApi {
  id: number;
  project_id: number;
  name: string;
  icon?: string;
  identifier?: string;
  visibility: TeamVisibility;
  members: MemberApi[];
  livrables: LivrableApi[];
}

export interface MemberApi {
  id: string;
  team_id: number;
  team: TeamApi;
  user_id: number;
  user: User;
  created_at: Date;
}

export interface CreateTeamInput {
  project_id?: number;
  name: string;
  identifier: string;
  visibility: number;
  icon?: string;
}
