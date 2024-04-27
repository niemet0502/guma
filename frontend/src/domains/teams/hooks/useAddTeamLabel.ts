import { GET_LABELS } from "@/domains/organization/hooks/useGetLabels";
import { gql, useMutation } from "@apollo/client";
import { CreateLabelInput } from "../type";

const CREATE_TEAM_LABEL = gql`
  mutation CreateTeamLabel($createLabelInput: CreateLabelInput!) {
    createLabel(createLabelInput: $createLabelInput) {
      id
      name
    }
  }
`;

export const useAddTeamLabel = () => {
  const [createLabelMutation, { error }] = useMutation(CREATE_TEAM_LABEL, {
    refetchQueries: [
      GET_LABELS, // DocumentNode object parsed with gql
    ],
  });

  const createLabel = async (createLabelInput: CreateLabelInput) => {
    try {
      const response = await createLabelMutation({
        variables: { createLabelInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createLabel) {
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { createLabel, error };
};
