import { gql, useQuery } from "@apollo/client";
import { LabelApi } from "../services/type";

export const GET_LABELS = gql`
  query labels($organization_id: Int!) {
    labels(organization_id: $organization_id) {
      id
      name
    }
  }
`;

export const useGetLabels = (organization_id: number) => {
  const { data, loading: isLoading } = useQuery<{ labels: LabelApi[] }>(
    GET_LABELS,
    {
      variables: { organization_id },
    }
  );
  return { data: data?.labels, isLoading };
};
