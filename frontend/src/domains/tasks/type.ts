import { User } from "../auth/services/types";
import { TeamApi } from "../teams/type";

export interface Activity {
  id: number;
  created_by: number;
  author: User;
  task_id: number;
  from_status: number;
  to_status: number;
  sprint_id: number;
  // sprint: Sprint;
  // action: String;
  created_at: String;
  updated_at: String;
}

export interface TaskApi {
  id: string;
  slug: string;
  name: string;
  description: string;
  identifier: string;
  number: string;
  type: number;
  priority: number;
  created_by: number;
  created_at: string;
  author: User;
  assignee_to: number;
  assignee: User;
  parent_task_id: number;
  sprint_id: number;
  status_id: number;
  // status: Status;
  team_id: number;
  team: TeamApi;
  subtasks: [TaskApi];
  comments: [Comment];
  activities: [Activity];
}
