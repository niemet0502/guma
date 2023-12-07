import { gql, useMutation } from "@apollo/client";
import { CreateSprintInput } from "../type";
import { GET_SPRINTS_BY_TEAM } from "./useSprints";

const CREATE_SPRINT = gql`
  mutation CreateSprint($createSprintInput: CreateSprintInput!) {
    createSprint(createSprintInput: $createSprintInput) {
      id
      name
    }
  }
`;

export const useCreateSprint = (onSuccessCallback: () => void) => {
  const [createSprintMutation, { data, error }] = useMutation(CREATE_SPRINT, {
    refetchQueries: [GET_SPRINTS_BY_TEAM],
  });

  const createSprint = async (createSprintInput: CreateSprintInput) => {
    try {
      const response = await createSprintMutation({
        variables: { createSprintInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createSprint) {
        onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { createSprint, data, error };
};
