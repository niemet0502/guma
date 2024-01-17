import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      lastname
      firstname
      email
      username
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
        username
        profile_id
        project_id
        project {
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
