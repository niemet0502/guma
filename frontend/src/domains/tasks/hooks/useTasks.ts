import { gql, useQuery } from "@apollo/client";
import { TaskApi } from "../type";

export const GET_TASKS_BY_TEAM = gql`
  query GetTasksByTeam(
    # $team_id: Int!
    $type: Int
    $status_id: Int
    $parent_task_id: Int
    $sprint_id: Int
  ) {
    tasks(
      team_id: 20
      type: $type
      status_id: $status_id
      parent_task_id: $parent_task_id
      sprint_id: $sprint_id
    ) {
      id
      name
      identifier
      created_at
      priority

      assignee_to
      assignee {
        id
        username
      }

      team {
        id
        visibility
        members {
          id
          user {
            id
            username
          }
        }
      }

      labels {
        id
        label {
          id
          name
        }
      }
    }
  }
`;

export const useTasks = () => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{
    tasks: TaskApi[];
  }>(GET_TASKS_BY_TEAM);

  return { data: data?.tasks, isLoading, error };
};
