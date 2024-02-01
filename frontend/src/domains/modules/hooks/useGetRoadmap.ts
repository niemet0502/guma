import { TeamApi } from "@/domains/teams/type";
import { gql, useQuery } from "@apollo/client";

export const GET_PROJECT_ROADMAP = gql`
  query GetProjetRoadmap($project_id: Int!) {
    teams(project_id: $project_id) {
      id
      name
      livrables {
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
          created_at
          description

          livrable {
            id
            name
          }

          author {
            id
            username
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
  }
`;

export const useGetRoadmap = (projectId: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ teams: TeamApi[] }>(GET_PROJECT_ROADMAP, {
    variables: { project_id: projectId },
  });
  return {
    data: data?.teams,
    isLoading,
    error,
  };
};
