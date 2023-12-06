import { gql, useMutation } from "@apollo/client";
import { UpdateSprintApi } from "../type";
import { GET_SPRINT_BY_ID } from "./useGetSprint";
import { GET_SPRINTS_BY_TEAM } from "./useSprints";

const UPDATE_SPRINT = gql`
  mutation updateSprint($updateSprintInput: UpdateSprintInput!) {
    updateSprint(updateSprintInput: $updateSprintInput) {
      id
      name
    }
  }
`;

export const useUpdateSprint = (onSuccessCallback?: () => void) => {
  const [updateSprintMutation, { error }] = useMutation(UPDATE_SPRINT, {
    refetchQueries: [GET_SPRINTS_BY_TEAM, GET_SPRINT_BY_ID],
  });

  const updateSprint = async (updateSprintInput: UpdateSprintApi) => {
    try {
      const response = await updateSprintMutation({
        variables: { updateSprintInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.updateSprint) {
        onSuccessCallback && onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", e);
    }
  };
  return { updateSprint, error };
};
