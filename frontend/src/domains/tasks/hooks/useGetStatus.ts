import { gql, useQuery } from "@apollo/client";
import { TaskStatusApi } from "../type";

export const GET_STATUS = gql`
  query GetStatus($team_id: Int!) {
    status(team_id: $team_id) {
      id
      name
      state
    }
  }
`;

export const useGetStatus = (team_id: number) => {
  const { data, error, refetch } = useQuery<{ status: TaskStatusApi[] }>(
    GET_STATUS,
    {
      variables: { team_id: +team_id },
    }
  );
  return { data: data?.status, error, refetch };
};
