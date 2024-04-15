import { GET_USERS_BY_ORGANIZATION } from "@/domains/users/hooks/useGetUsers";
import { gql, useMutation } from "@apollo/client";
import { GET_TEAM } from "./useGetTeam";

const REMOVE_TEAM_MEMBER = gql`
  mutation RemoveTeamMember($id: Int!) {
    removeMember(id: $id) {
      id
    }
  }
`;

export const useRemoveTeamMember = () => {
  const [removeTeamMember, { error, loading }] = useMutation(
    REMOVE_TEAM_MEMBER,
    {
      refetchQueries: [GET_TEAM, GET_USERS_BY_ORGANIZATION],
    }
  );
  return { removeTeamMember, error, loading };
};
