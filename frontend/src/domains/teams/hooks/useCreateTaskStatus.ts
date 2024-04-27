import { GET_STATUS } from "@/domains/tasks/hooks/useGetStatus";
import { gql, useMutation } from "@apollo/client";
import { CreateStatusInput } from "../type";

const CREATE_TASK_STATUS = gql`
  mutation CreateTaskStatus($createStatusInput: CreateStatusInput!) {
    createStatus(createStatusInput: $createStatusInput) {
      id
      name
      team_id
    }
  }
`;

export const useCreateTaskStatus = () => {
  const [createTaskStatusMutation, { error }] = useMutation(
    CREATE_TASK_STATUS,
    {
      refetchQueries: [GET_STATUS],
    }
  );

  const createTaskStatus = async (createStatusInput: CreateStatusInput) => {
    try {
      const response = await createTaskStatusMutation({
        variables: { createStatusInput },
      });

      if (response.data && response.data.createStatus) {
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
  return { createTaskStatus, error };
};
