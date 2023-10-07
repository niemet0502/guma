import { gql, useQuery } from "@apollo/client";
import { TeamApi } from "../type";

export const GET_TEAM = gql`
  query getTeamByName($name: String!) {
    getTeamByName(name: $name) {
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

export const useGetTeam = (name?: string) => {
  const { data, loading: isLoading } = useQuery<{ getTeamByName: TeamApi }>(
    GET_TEAM,
    {
      variables: { name },
    }
  );
  return { data: data?.getTeamByName, isLoading };
};
