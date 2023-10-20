import { gql, useMutation } from "@apollo/client";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";

const REMOVE_COMMENT = gql`
  mutation RemoveComment($id: Int!) {
    removeComment(id: $id) {
      id
    }
  }
`;

export const useRemoveComment = () => {
  const [removeComment, { error, loading }] = useMutation(REMOVE_COMMENT, {
    refetchQueries: [GET_TASK_BY_SLUG_AND_TEAM],
  });
  return { removeComment, error, loading };
};
