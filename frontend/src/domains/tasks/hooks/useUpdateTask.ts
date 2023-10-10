import { gql, useMutation } from "@apollo/client";
import { UpdateTaskApi } from "../type";
import { GET_TASKS_BY_TEAM } from "./useTasks";

const UPDATE_TASK = gql`
  mutation updateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      id
      name
    }
  }
`;

export const useUpdateTask = () => {
  const [updateTaskMutation, { error }] = useMutation(UPDATE_TASK, {
    refetchQueries: [GET_TASKS_BY_TEAM],
  });

  const updateTask = async (updateTaskInput: UpdateTaskApi) => {
    try {
      const response = await updateTaskMutation({
        variables: { updateTaskInput },
      });

      if (response.data && response.data.updateTask) {
        console.log("response");
      }
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", e);
    }
  };
  return { updateTask, error };
};
