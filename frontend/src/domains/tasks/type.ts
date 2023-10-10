import { User } from "../auth/services/types";
import { LabelApi } from "../organization/services/type";
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

export interface GetTasksFilter {
  team_id: number;
  type?: number;
  status_name?: string;
  parent_task_id?: number;
  sprint_id?: number;
}

export interface CreateTaskApi {
  name: string;
  description?: string;
  type?: number;
  priority?: number;
  labels?: number[];
  created_by?: number;
  assignee_to?: number;
  parent_task_id?: number;
  sprint_id?: number;
  status_id?: number;
  team_id?: number;
}

export interface UpdateTaskApi {
  id: number;
  name?: string;
  description?: string;
  type?: number;
  priority?: number;
  assignee_to?: number;
  parent_task_id?: number;
  sprint_id?: number;
  status_id?: number;
}

export interface TaskLabelApi {
  id: string;
  task_id: number;
  label_id: number;
  label: LabelApi;
}

export interface TaskApi {
  id: number;
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
  labels: [TaskLabelApi];
}
