import { gql, useQuery } from "@apollo/client";
import { LabelApi } from "../services/type";

export const GET_LABELS = gql`
  query labels($project_id: Int!) {
    labels(project_id: $project_id) {
      id
      name
    }
  }
`;

export const useGetLabels = (project_id: number) => {
  const { data, loading: isLoading } = useQuery<{ labels: LabelApi[] }>(
    GET_LABELS,
    {
      variables: { project_id: +project_id },
    }
  );
  return { data: data?.labels, isLoading };
};
