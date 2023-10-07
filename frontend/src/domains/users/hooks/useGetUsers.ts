import { User } from "@/domains/auth/services/types";
import { gql, useQuery } from "@apollo/client";

export const GET_USERS_BY_ORGANIZATION = gql`
  query GetUsersByOrganization($organization_id: Int!) {
    users(organization_id: $organization_id) {
      id
      username
      lastname
      firstname
      email
    }
  }
`;

export const useGetUsers = (organization_id: number) => {
  const {
    data,
    loading: isLoading,
    error,
  } = useQuery<{ users: User[] }>(GET_USERS_BY_ORGANIZATION, {
    variables: { organization_id },
  });
  return { data: data?.users, isLoading, error };
};
