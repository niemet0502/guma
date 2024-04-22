import { GET_LABELS } from "@/domains/organization/hooks/useGetLabels";
import { gql, useMutation } from "@apollo/client";
import { UpdateLabelInput } from "../type";

const UPDATE_TEAM_LABEL = gql`
  mutation updateLabel($updateLabelInput: UpdateLabelInput!) {
    updateLabel(updateLabelInput: $updateLabelInput) {
      id
      name
    }
  }
`;

export const useUpdateTeamLabel = () => {
  const [updateLabelMutation, { error }] = useMutation(UPDATE_TEAM_LABEL, {
    refetchQueries: [GET_LABELS],
  });
  const updateLabel = async (updateLabelInput: UpdateLabelInput) => {
    try {
      const response = await updateLabelMutation({
        variables: { updateLabelInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.updateLabel) {
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { updateLabel, error };
};
