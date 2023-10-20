import { gql, useMutation } from "@apollo/client";
import { CreateCommentInput } from "../type";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";

const ADD_COMMENT = gql`
  mutation AddComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
    }
  }
`;

export const useCreateComment = () => {
  const [addCommentMutation, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [GET_TASK_BY_SLUG_AND_TEAM],
  });

  const addComment = async (createCommentInput: CreateCommentInput) => {
    try {
      await addCommentMutation({
        variables: { createCommentInput },
      });
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { addComment, error };
};
