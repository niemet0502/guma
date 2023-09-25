import { gql, useQuery } from "@apollo/client";
import { TeamApi } from "../type";

const GET_TEAMS_BY_ORGANIZATION_ID = gql`
  query GetTeamsByOrganizaionId($organization_id: Int!) {
    teams(organization_id: $organization_id) {
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
  }>(GET_TEAMS_BY_ORGANIZATION_ID, {
    variables: { organization_id: +organizationId },
  });

  return { data: data?.teams, isLoading, error };
};
