import { gql, useQuery } from "@apollo/client";
import { LabelApi } from "../services/type";

export const GET_LABELS = gql`
  query labels($project_id: Int, $team_id: Int) {
    labels(project_id: $project_id, team_id: $team_id) {
      id
      name
    }
  }
`;

export const useGetLabels = (project_id?: number, team_id?: number) => {
  const {
    data,
    loading: isLoading,
    refetch,
  } = useQuery<{ labels: LabelApi[] }>(GET_LABELS, {
    variables: {
      project_id: project_id ? +project_id : undefined,
      team_id: team_id ? +team_id : undefined,
    },
  });
  return { data: data?.labels, isLoading, refetch };
};
