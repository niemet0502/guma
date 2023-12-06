import { SprintApi } from "@/domains/tasks/type";
import { gql, useQuery } from "@apollo/client";

export const GET_SPRINT_BY_ID = gql`
  query GetSprintById($id: Int!) {
    sprint(id: $id) {
      id
      name
      duration
      start_at
      end_at
      goal
      team_id
      isCompleted
      status
      totalTasksUponClose
      unCompletedTasksUponClose

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

      tasks {
        id
        name
        identifier
        priority
        assignee_to
        position
        slug
        created_at

        assignee {
          id
          username
        }

        labels {
          id
          label {
            id
            name
          }
        }

        status_id
        status {
          id
          name
        }
      }

      unClosedTasks {
        id
        name
        identifier
        priority
        assignee_to
        position
        slug
        created_at

        assignee {
          id
          username
        }

        labels {
          id
          label {
            id
            name
          }
        }

        status_id
        status {
          id
          name
        }
      }
    }
  }
`;

export const useGetSprint = (sprintId: string) => {
  const { data, error } = useQuery<{ sprint: SprintApi }>(GET_SPRINT_BY_ID, {
    variables: { id: +sprintId },
  });
  return { data: data?.sprint, error };
};
