import { gql, useMutation } from "@apollo/client";
import { CreateTeamInput } from "../type";
import { GET_TEAMS_BY_PROJECT_ID } from "./useTeams";

const CREATE_TEAM = gql`
  mutation CreateTeam($createTeamInput: CreateTeamInput!) {
    createTeam(createTeamInput: $createTeamInput) {
      id
      name
    }
  }
`;

export const useCreateTeam = (onSuccessCallback: () => void) => {
  const [createTeamMutation, { error }] = useMutation(CREATE_TEAM, {
    refetchQueries: [
      GET_TEAMS_BY_PROJECT_ID, // DocumentNode object parsed with gql
    ],
  });

  const createTeam = async (createTeamInput: CreateTeamInput) => {
    try {
      const response = await createTeamMutation({
        variables: { createTeamInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createTeam) {
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

  return { createTeam, error };
};
