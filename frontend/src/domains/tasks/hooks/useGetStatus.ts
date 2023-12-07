import { WorkflowApi } from "@/domains/teams/type";
import { gql, useQuery } from "@apollo/client";

const GET_STATUS = gql`
  query GetStatus($team_id: Int!) {
    workflows(team_id: $team_id) {
      id
      order_value
      status {
        id
        name
      }
    }
  }
`;

export const useGetStatus = (team_id: number) => {
  const { data, error } = useQuery<{ workflows: WorkflowApi[] }>(GET_STATUS, {
    variables: { team_id },
  });
  return { data: data?.workflows?.map(({ status }) => status), error };
};
