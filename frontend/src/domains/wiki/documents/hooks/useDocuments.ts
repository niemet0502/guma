import { gql, useQuery } from "@apollo/client";
import { DocumentApi } from "../type";

const GET_DOCUMENTS_BY_TEAM = gql`
  query GetDocumentsByTeam($team_id: Int!) {
    documents(team_id: $team_id) {
      id
      name
      folder_id
      team_id

      content

      created_by

      author {
        id
        username
      }

      created_at
      updated_at
    }
  }
`;

export const useDocuments = () => {
  const { data, error, loading } = useQuery<{ documents: DocumentApi[] }>(
    GET_DOCUMENTS_BY_TEAM,
    {
      variables: { team_id: 20 },
    }
  );
  return { data: data?.documents, error, isLoading: loading };
};
