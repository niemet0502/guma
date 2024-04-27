import { GET_STATUS } from "@/domains/tasks/hooks/useGetStatus";
import { gql, useMutation } from "@apollo/client";

const REMOVE_STATUS = gql`
  mutation RemoveStatus($id: Int!) {
    removeStatus(id: $id) {
      id
    }
  }
`;

export const useRemoveStatus = () => {
  const [removeStatus, { error, loading }] = useMutation(REMOVE_STATUS, {
    refetchQueries: [GET_STATUS],
  });
  return { removeStatus, error, loading };
};
