import { GET_TASKS_BY_TEAM } from "@/domains/tasks/hooks/useTasks";
import { gql, useMutation } from "@apollo/client";
import { CompleteSprintInput } from "../type";
import { GET_SPRINT_BY_ID } from "./useGetSprint";
import { GET_SPRINTS_BY_TEAM } from "./useSprints";

const COMPLETE_SPRINT = gql`
  mutation CompleteSprint($completeSprintInput: CompleteSprintInput!) {
    completeSprint(completeSprintInput: $completeSprintInput) {
      id
      name
    }
  }
`;

export const useCompleteSprint = (onSuccessCallback?: () => void) => {
  const [completeSprintMutation, { data, error }] = useMutation(
    COMPLETE_SPRINT,
    {
      refetchQueries: [
        GET_SPRINTS_BY_TEAM,
        GET_SPRINT_BY_ID,
        GET_TASKS_BY_TEAM,
      ],
    }
  );

  const completeSprint = async (completeSprintInput: CompleteSprintInput) => {
    try {
      const response = await completeSprintMutation({
        variables: { completeSprintInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.completeSprint) {
        onSuccessCallback && onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { completeSprint, data, error };
};
