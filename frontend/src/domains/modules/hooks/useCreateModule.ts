import { gql, useMutation } from "@apollo/client";
import { CreateLivrableInput } from "../type";
import { GET_PROJECT_ROADMAP } from "./useGetRoadmap";
import { GET_LIVRABLES } from "./useModules";

const CREATE_MODULE = gql`
  mutation CreateModule($createLivrableInput: CreateLivrableInput!) {
    createLivrable(createLivrableInput: $createLivrableInput) {
      id
      name
    }
  }
`;

export const useCreateModule = (onSuccessCallback?: () => void) => {
  const [createModuleMutation, { error }] = useMutation(CREATE_MODULE, {
    refetchQueries: [GET_LIVRABLES, GET_PROJECT_ROADMAP],
  });

  const createLivrable = async (createLivrableInput: CreateLivrableInput) => {
    try {
      const response = await createModuleMutation({
        variables: { createLivrableInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createLivrable) {
        onSuccessCallback && onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { createLivrable, error };
};
