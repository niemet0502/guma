import { User } from "@/domains/auth/services/types";
import { gql, useQuery } from "@apollo/client";

export const GET_USERS_BY_ORGANIZATION = gql`
  query GetUsersByOrganization($project_id: Int!) {
    users(project_id: $project_id) {
      id
      username
      lastname
      firstname
      email
    }
  }
`;

export const useGetUsers = (project_id: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ users: User[] }>(GET_USERS_BY_ORGANIZATION, {
    variables: { project_id: +project_id },
  });
  return { data: data?.users, isLoading, error };
};
