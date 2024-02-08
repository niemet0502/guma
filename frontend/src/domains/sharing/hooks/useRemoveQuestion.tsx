import { gql, useMutation } from "@apollo/client";
import { GET_QUESTIONS } from "./useQuestion";

const REMOVE_QUESTION = gql`
  mutation RemoveQuestion($id: Int!) {
    removeQuestion(id: $id) {
      id
    }
  }
`;

export const useRemoveQuestion = () => {
  const [removeQuestion, { error, loading }] = useMutation(REMOVE_QUESTION, {
    refetchQueries: [GET_QUESTIONS],
  });
  return { removeQuestion, error, loading };
};
