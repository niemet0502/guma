import { gql, useQuery } from "@apollo/client";
import { TeamApi } from "../type";

export const GET_TEAM = gql`
  query getTeamByName($name: String!, $project_id: Int!) {
    getTeamByName(name: $name, project_id: $project_id) {
      id
      name
      slug
      visibility
      identifier
      members {
        id
        user {
          id
          username
          email

          profile {
            id
            name
          }
        }
      }
    }
  }
`;

export const useGetTeam = (organizationId: number, name?: string) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ getTeamByName: TeamApi }>(GET_TEAM, {
    variables: { name, project_id: +organizationId },
  });

  return { data: data?.getTeamByName, isLoading, error };
};
