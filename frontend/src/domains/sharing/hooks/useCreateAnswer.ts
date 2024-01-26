import { gql, useMutation } from "@apollo/client";
import { CreateAnswerInput } from "../type";
import { GET_QUESTION_BY_ID } from "./useGetQuestion";

const CREATE_ANSWER = gql`
  mutation createAnswer($createAnswerInput: CreateAnswerInput!) {
    createAnswer(createAnswerInput: $createAnswerInput) {
      id
    }
  }
`;

export const useCreateAnswer = () => {
  const [createAnswerMutation, { error }] = useMutation(CREATE_ANSWER, {
    refetchQueries: [GET_QUESTION_BY_ID],
  });

  const createAnswer = async (createAnswerInput: CreateAnswerInput) => {
    try {
      const response = await createAnswerMutation({
        variables: { createAnswerInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createAnswer) {
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

  return { createAnswer, error };
};
