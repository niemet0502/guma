import { gql, useQuery } from "@apollo/client";
import { FolderApi } from "../type";

const GET_FOLDERS_BY_TEAM = gql`
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
  const { data, error, loading } = useQuery<{ folders: FolderApi[] }>(
    GET_FOLDERS_BY_TEAM,
    {
      variables: { team_id: 20 },
    }
  );
  return { data: data?.folders, error, isLoading: loading };
};
