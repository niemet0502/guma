import { gql, useQuery } from "@apollo/client";
import { TeamApi } from "../type";

export const GET_TEAMS_BY_project_id = gql`
  query GetTeamsByOrganizaionId($project_id: Int!) {
    teams(project_id: $project_id) {
      id
      name
      visibility
      members {
        id
        user_id
      }
    }
  }
`;

export const useTeams = (organizationId: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{
    teams: TeamApi[];
  }>(GET_TEAMS_BY_project_id, {
    variables: { project_id: +organizationId },
  });

  return { data: data?.teams, isLoading, error };
};
