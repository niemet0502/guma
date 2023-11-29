import { SprintApi } from "@/domains/tasks/type";
import { gql, useLazyQuery } from "@apollo/client";

export const GET_SPRINTS_BY_TEAM = gql`
  query GetSprintsByTeam($team_id: Int!) {
    sprints(team_id: $team_id) {
      id
      name
      goal
      end_at
      start_at
      isCompleted
      status
      totalTasksUponClose
      unCompletedTasksUponClose

      tasks {
        id
        name

        status {
          id
          name
        }
      }
    }
  }
`;

export const useSprints = () => {
  const [getSprints, { data, error }] = useLazyQuery<{ sprints: SprintApi[] }>(
    GET_SPRINTS_BY_TEAM
  );

  const fetchSprints = (team_id: number) => {
    getSprints({ variables: { team_id } });
  };
  return { fetchSprints, data: data?.sprints, error };
};
