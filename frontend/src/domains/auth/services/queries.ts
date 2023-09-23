import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      lastname
      firstname
      email
    }
  }
`;

export const USER_ACCOUNT_AUTH = gql`
  mutation userAccountAuth($createAuthInput: CreateAuthInput!) {
    userAccountAuth(createAuthInput: $createAuthInput) {
      user {
        id
        email
        lastname
        firstname
        organization_id
        organization {
          id
          name
        }
      }

      session {
        id
        token
      }
    }
  }
`;
