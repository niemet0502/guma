import { gql, useLazyQuery } from "@apollo/client";
import { GetTasksFilter, TaskApi } from "../type";

export const GET_TASKS_BY_TEAM = gql`
  query GetTasksByTeam(
    $team_id: Int!
    $type: Int
    $status_name: String
    $parent_task_id: Int
    $sprint_id: Int
  ) {
    tasks(
      team_id: $team_id
      type: $type
      status_name: $status_name
      parent_task_id: $parent_task_id
      sprint_id: $sprint_id
    ) {
      id
      name
      identifier
      created_at
      priority
      slug
      parent_task_id

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
  const [getTasks, { data, loading: isLoading, error }] = useLazyQuery<{
    tasks: TaskApi[];
  }>(GET_TASKS_BY_TEAM);

  const fetchTasks = (filter: GetTasksFilter) => {
    const {
      team_id = undefined,
      type = undefined,
      status_name = undefined,
      sprint_id = undefined,
      parent_task_id,
    } = filter;

    getTasks({
      variables: { team_id, type, status_name, sprint_id, parent_task_id },
    });
  };

  return { fetchTasks, data: data?.tasks, isLoading, error };
};
