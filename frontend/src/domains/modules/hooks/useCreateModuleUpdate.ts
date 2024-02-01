import { gql, useMutation } from "@apollo/client";
import { CreateLivrableupdateInput } from "../type";

const CREATE_MODULE_UPDATE = gql`
  mutation CreateModuleUpdate(
    $createLivrableupdateInput: CreateLivrableupdateInput!
  ) {
    createLivrableupdate(
      createLivrableupdateInput: $createLivrableupdateInput
    ) {
      id
      status
      name
    }
  }
`;

export const useCreateModuleUpdate = (onSuccessCallback?: () => void) => {
  const [createUpdateMutation, { error }] = useMutation(CREATE_MODULE_UPDATE);

  const createUpdate = async (
    createLivrableupdateInput: CreateLivrableupdateInput
  ) => {
    try {
      const response = await createUpdateMutation({
        variables: { createLivrableupdateInput },
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
  return { createUpdate, error };
};
