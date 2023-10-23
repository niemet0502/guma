import { SprintApi } from "@/domains/tasks/type";
import { gql, useQuery } from "@apollo/client";

const GET_SPRINTS_BY_TEAM = gql`
  query GetSprintsByTeam($team_id: Int!) {
    sprints(team_id: $team_id) {
      id
      name
      goal
      end_at
      start_at
      isCompleted

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
  const { data, error } = useQuery<{ sprints: SprintApi[] }>(
    GET_SPRINTS_BY_TEAM,
    {
      variables: { team_id: 20 },
    }
  );
  return { data: data?.sprints, error };
};
