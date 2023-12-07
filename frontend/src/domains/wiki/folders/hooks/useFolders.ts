import { gql, useLazyQuery } from "@apollo/client";
import { FolderApi } from "../type";

export const GET_FOLDERS_BY_TEAM = gql`
  query GetFoldersByTeam($team_id: Int!) {
    folders(team_id: $team_id) {
      id
      name
      created_by

      author {
        id
        username
      }

      documents {
        id
        name
      }
    }
  }
`;

export const useFolders = () => {
  const [getFolders, { data, error, loading }] = useLazyQuery<{
    folders: FolderApi[];
  }>(GET_FOLDERS_BY_TEAM);

  const fetchFolders = (team_id: number) => {
    getFolders({
      variables: { team_id },
    });
  };
  return { fetchFolders, data: data?.folders, error, isLoading: loading };
};
