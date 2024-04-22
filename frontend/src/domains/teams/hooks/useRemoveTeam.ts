import { gql, useMutation } from "@apollo/client";
import { GET_TEAMS_BY_PROJECT_ID } from "./useTeams";

const REMOVE_TEAM = gql`
  mutation RemoveTeam($id: Int!) {
    removeTeam(id: $id) {
      id
    }
  }
`;

export const useRemoveTeam = () => {
  const [removeTeam, { error, loading }] = useMutation(REMOVE_TEAM, {
    refetchQueries: [GET_TEAMS_BY_PROJECT_ID],
  });
  return { removeTeam, error, loading };
};
