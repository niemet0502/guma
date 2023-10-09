import { gql, useQuery } from "@apollo/client";
import { TeamApi } from "../type";

export const GET_TEAM = gql`
  query getTeamByName($name: String!, $organization_id: Int!) {
    getTeamByName(name: $name, organization_id: $organization_id) {
      id
      name
      visibility
      members {
        id
        user {
          id
          username
        }
      }
    }
  }
`;

export const useGetTeam = (organizationId: number, name?: string) => {
  const { data, loading: isLoading } = useQuery<{ getTeamByName: TeamApi }>(
    GET_TEAM,
    {
      variables: { name, organization_id: +organizationId },
    }
  );
  return { data: data?.getTeamByName, isLoading };
};
