import { gql, useMutation } from "@apollo/client";
import { UpdateReminderInput } from "../type";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";

const UPDATE_REMINDER = gql`
  mutation UpdateReminder($updateReminderInput: UpdateReminderInput!) {
    updateReminder(updateReminderInput: $updateReminderInput) {
      id
      title
      message
    }
  }
`;

export const useUpdateReminder = (onSuccessCallback: () => void) => {
  const [updateReminderMutation, { error }] = useMutation(UPDATE_REMINDER, {
    refetchQueries: [GET_TASK_BY_SLUG_AND_TEAM],
  });

  const updateReminder = async (updateReminderInput: UpdateReminderInput) => {
    try {
      const response = await updateReminderMutation({
        variables: { updateReminderInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.updateReminder) {
        onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", e);
    }
  };
  return { updateReminder, error };
};
