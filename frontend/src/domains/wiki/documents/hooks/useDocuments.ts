import { gql, useLazyQuery } from "@apollo/client";
import { DocumentApi } from "../type";

export const GET_DOCUMENTS_BY_TEAM = gql`
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
  const [getDocuments, { data, error, loading }] = useLazyQuery<{
    documents: DocumentApi[];
  }>(GET_DOCUMENTS_BY_TEAM);

  const fetchDocuments = (team_id: number) => {
    getDocuments({
      variables: {
        team_id,
      },
    });
  };
  return { fetchDocuments, data: data?.documents, error, isLoading: loading };
};
