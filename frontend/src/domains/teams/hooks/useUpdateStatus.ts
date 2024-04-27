import { GET_STATUS } from "@/domains/tasks/hooks/useGetStatus";
import { gql, useMutation } from "@apollo/client";
import { UpdateStatusInput } from "../type";

const UPDATE_STATUS = gql`
  mutation updateStatus($updateStatusInput: UpdateStatusInput!) {
    updateStatus(updateStatusInput: $updateStatusInput) {
      id
      name
    }
  }
`;

export const useUpdateStatus = () => {
  const [updateStatusMutation, { error }] = useMutation(UPDATE_STATUS, {
    refetchQueries: [GET_STATUS],
  });

  const updateTaskStatus = async (updateStatusInput: UpdateStatusInput) => {
    try {
      const response = await updateStatusMutation({
        variables: { updateStatusInput },
      });

      if (response.data && response.data.updateStatus) {
        // onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { error, updateTaskStatus };
};
