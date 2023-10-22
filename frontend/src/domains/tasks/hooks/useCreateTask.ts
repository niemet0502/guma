import { gql, useMutation } from "@apollo/client";
import { CreateTaskApi } from "../type";
import { GET_TASK_BY_SLUG_AND_TEAM } from "./useGetTask";
import { GET_TASKS_BY_TEAM } from "./useTasks";

const CREATE_TASK = gql`
  mutation createTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      name
    }
  }
`;

export const useCreateTask = (onSuccessCallback: () => void) => {
  const [createTaskMutation, { error }] = useMutation(CREATE_TASK, {
    refetchQueries: [GET_TASKS_BY_TEAM, GET_TASK_BY_SLUG_AND_TEAM],
  });

  const createTask = async (createTaskInput: CreateTaskApi) => {
    try {
      const response = await createTaskMutation({
        variables: { createTaskInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createTask) {
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

  return { createTask, error };
};
