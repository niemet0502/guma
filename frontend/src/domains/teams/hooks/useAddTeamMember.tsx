import { gql, useMutation } from "@apollo/client";
import { CreateMemberInput } from "../type";
import { GET_TEAM } from "./useGetTeam";

const ADD_TEAM_MEMBER = gql`
  mutation AddTeamMember($createMemberInput: CreateMemberInput!) {
    createMember(createMemberInput: $createMemberInput) {
      id
    }
  }
`;

export const useAddTeamMember = () => {
  const [createMemberMutation, { error }] = useMutation(ADD_TEAM_MEMBER, {
    refetchQueries: [GET_TEAM],
  });

  const addTeamMember = async (createMemberInput: CreateMemberInput) => {
    try {
      const response = await createMemberMutation({
        variables: { createMemberInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createMember) {
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { addTeamMember, error };
};
