import { gql, useMutation } from "@apollo/client";
import { CreateQuestionInput } from "../type";
import { GET_QUESTIONS } from "./useQuestion";

const CREATE_QUESTION = gql`
  mutation CreateQuestion($createQuestionInput: CreateQuestionInput!) {
    createQuestion(createQuestionInput: $createQuestionInput) {
      id
      title
      content
    }
  }
`;

export const useCreateQuestion = (onSuccessCallback?: () => void) => {
  const [createQuestionMutation, { data, error }] = useMutation(
    CREATE_QUESTION,
    {
      ignoreResults: false,
      refetchQueries: [GET_QUESTIONS],
    }
  );

  const createQuestion = async (createQuestionInput: CreateQuestionInput) => {
    try {
      const response = await createQuestionMutation({
        variables: { createQuestionInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createQuestion) {
        onSuccessCallback && onSuccessCallback();
        return response.data.createQuestion;
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { createQuestion, error, data: data };
};
