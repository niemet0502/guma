import { gql, useLazyQuery } from "@apollo/client";
import { LivrableApi } from "../type";

export const GET_LIVRABLES = gql`
  query GetLivrables($team_id: Int!) {
    livrables(team_id: $team_id) {
      id
      name
      description
      end_at
      start_at
      status
      team_id

      team {
        id
        name
      }
      created_by
      author {
        id
        username
      }
      updates {
        id
        status
        description
        created_at

        author {
          id
          username
        }

        livrable {
          id
          name
        }
      }

      tasks {
        id
        status {
          id
          name
          state
        }
      }
    }
  }
`;

export const useModules = () => {
  const [getModules, { data, error, loading: isLoading }] = useLazyQuery<{
    livrables: LivrableApi[];
  }>(GET_LIVRABLES);

  const fetchModules = (teamId: number) => {
    getModules({ variables: { team_id: teamId } });
  };
  return { fetchModules, data: data?.livrables, error, isLoading };
};
