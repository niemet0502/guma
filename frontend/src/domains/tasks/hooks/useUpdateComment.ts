import { gql, useMutation } from "@apollo/client";
import { UpdateCommentInput } from "../type";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";

const UPDATE_COMMENT = gql`
  mutation updateComment($updateCommentInput: UpdateCommentInput!) {
    updateComment(updateCommentInput: $updateCommentInput) {
      id
      content
    }
  }
`;

export const useUpdateComment = () => {
  const [updateCommentMutation, { error, loading }] = useMutation(
    UPDATE_COMMENT,
    {
      refetchQueries: [GET_TASK_BY_SLUG_AND_TEAM],
    }
  );

  const updateComment = async (updateCommentInput: UpdateCommentInput) => {
    try {
      await updateCommentMutation({
        variables: { updateCommentInput },
      });
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { updateComment, error, isLoading: loading };
};
