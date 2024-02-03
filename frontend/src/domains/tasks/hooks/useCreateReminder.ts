import { gql, useMutation } from "@apollo/client";
import { CreateReminderInput } from "../type";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";

const CREATE_REMINDER = gql`
  mutation CreateReminder($createReminderInput: CreateReminderInput!) {
    createReminder(createReminderInput: $createReminderInput) {
      id
      title
    }
  }
`;

export const useCreateReminder = (onSuccessCallback: () => void) => {
  const [createReminderMutation, { error, reset }] = useMutation(
    CREATE_REMINDER,
    {
      refetchQueries: [GET_TASK_BY_SLUG_AND_TEAM],
    }
  );

  const setReminder = async (createReminderInput: CreateReminderInput) => {
    try {
      const response = await createReminderMutation({
        variables: { createReminderInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createReminder) {
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
  return { setReminder, error, reset };
};
