import { User } from "../auth/services/types";
import { LabelApi } from "../organization/services/type";
import { TeamApi } from "../teams/type";

export enum ActivityAction {
  CREATE_ISSUE = "created the issue",
  CHANGED_STATUS = "changed status from",
  CHANGED_TITLE = "changed the title",
  UPDATED_DESCRIPTION = "updated the description of the issue",
  REMOVED_SPRINT = "removed issue from",
  ADDED_SPRINT = "add issue to",
  ADDED_PROJECT = "added to project",
  UPDATED_SPRINT = "moved issue from",
  ADDED_LABEL = "added labels",
}

export interface CreateCommentInput {
  content: string;
  task_id?: number;
  parent_id?: number;
}

export interface TaskStatusApi {
  id: number;
  name: string;
  team_id?: number;
}

export interface SprintApi {
  id: number;
  name: string;
  goal?: string;
  end_at: string;
  start_at: string;
}

export interface Activity {
  id: number;
  created_by: number;
  author: User;
  task_id: number;
  from_status: number;
  to_status: number;
  sprint_id: number;
  action: ActivityAction;
  created_at: string;
  updated_at: string;

  sprint?: SprintApi;
  to?: TaskStatusApi;
  from?: TaskStatusApi;
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

export interface CommentApi {
  id: number;
  content: string;
  created_at: string;
  updated_at: string;
  author: User;
  replies?: CommentApi[];
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
  sprint: SprintApi;
  status_id: number;
  status: TaskStatusApi;
  team_id: number;
  team: TeamApi;
  subtasks: [TaskApi];
  comments: [CommentApi];
  activities: [Activity];
  labels: [TaskLabelApi];
}
