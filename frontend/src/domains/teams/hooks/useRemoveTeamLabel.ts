import { GET_LABELS } from "@/domains/organization/hooks/useGetLabels";
import { gql, useMutation } from "@apollo/client";

const REMOVE_TEAM_LABEL = gql`
  mutation RemoveLabel($id: Int!) {
    removeLabel(id: $id) {
      id
    }
  }
`;

export const useRemoveTeamLabel = () => {
  const [removeLabel, { error, loading }] = useMutation(REMOVE_TEAM_LABEL, {
    refetchQueries: [GET_LABELS],
  });
  return { removeLabel, error, loading };
};
