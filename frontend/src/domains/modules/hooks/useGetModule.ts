import { gql, useQuery } from "@apollo/client";
import { LivrableApi } from "../type";

export const GET_MODULE_BY_ID = gql`
  query GetModuleById($id: Int!) {
    livrable(id: $id) {
      id
      name
      description
      end_at
      start_at
      status
      team_id

      created_by
      author {
        id
        username
      }

      updates {
        id
        status
        description
      }

      tasks {
        id
        name
        identifier
        created_at
        priority
        slug
        parent_task_id
        position
        status_id
        status {
          id
          name
          state
        }

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

        sprint_id
        sprint {
          id
          name
        }
      }

      documents {
        id
        name
        updated_at
      }
    }
  }
`;

export const useGetModule = (moduleId: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ livrable: LivrableApi }>(GET_MODULE_BY_ID, {
    variables: { id: moduleId },
  });
  return { data: data?.livrable, isLoading, error };
};
