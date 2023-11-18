import { gql, useQuery } from "@apollo/client";
import { FolderApi } from "../type";

export const GET_FOLDER_BY_ID = gql`
  query GetFolderById($id: Int!) {
    folder(id: $id) {
      id
      name
      created_by

      author {
        id
        username
      }

      team {
        id
        name
      }

      documents {
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
  }
`;

export const useGetFolder = (id: string) => {
  const { data, error, loading } = useQuery<{ folder: FolderApi }>(
    GET_FOLDER_BY_ID,
    {
      variables: { id: +id },
    }
  );
  return { data: data?.folder, error, isLoading: loading };
};
