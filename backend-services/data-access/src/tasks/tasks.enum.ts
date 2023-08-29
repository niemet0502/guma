export enum TaskType {
  ISSUE = 1,
  BUG = 2,
}

export enum ActivityAction {
  CREATE_ISSUE = 'created the issue',
  CHANGED_STATUS = 'changed status from',
  CHANGED_TITLE = 'changed the title',
  UPDATED_DESCRIPTION = 'updated the description of the issue',
  REMOVED_SPRINT = 'removed issue from',
  ADDED_SPRINT = 'add issue to',
  ADDED_PROJECT = 'added to project',
  UPDATED_SPRINT = 'moved issue from',
  ADDED_LABEL = 'added labels',
}
