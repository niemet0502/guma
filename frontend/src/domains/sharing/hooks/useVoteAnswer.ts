import { gql, useMutation } from "@apollo/client";
import { CreateVoteInput } from "../type";
import { GET_QUESTION_BY_ID } from "./useGetQuestion";

export const CREATE_VOTE = gql`
  mutation createVote($createVoteInput: CreateVoteInput!) {
    createVote(createVoteInput: $createVoteInput) {
      id
    }
  }
`;

export const useVoteAnswer = () => {
  const [createVoteMutation, { error }] = useMutation(CREATE_VOTE, {
    refetchQueries: [GET_QUESTION_BY_ID],
  });

  const postVote = async (createVoteInput: CreateVoteInput) => {
    try {
      const response = await createVoteMutation({
        variables: { createVoteInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createVote) {
        //   onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };

  return { postVote, error };
};
