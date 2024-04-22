import { gql, useMutation } from "@apollo/client";
import { UpdateTeamInput } from "../type";
import { GET_TEAM } from "./useGetTeam";
import { GET_TEAMS_BY_PROJECT_ID } from "./useTeams";

const UPDATE_TEAM = gql`
  mutation updateTeam($updateTeamInput: UpdateTeamInput!) {
    updateTeam(updateTeamInput: $updateTeamInput) {
      id
      name
    }
  }
`;

export const useUpdateTeam = () => {
  const [updateTeamMutation, { error }] = useMutation(UPDATE_TEAM, {
    refetchQueries: [GET_TEAMS_BY_PROJECT_ID, GET_TEAM],
  });

  const updateTeam = async (updateTeamInput: UpdateTeamInput) => {
    try {
      const response = await updateTeamMutation({
        variables: { updateTeamInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.updateSprint) {
        // onSuccessCallback && onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", e);
    }
  };
  return { updateTeam, error };
};
