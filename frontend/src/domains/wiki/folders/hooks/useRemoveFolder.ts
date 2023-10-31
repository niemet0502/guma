import { gql, useMutation } from "@apollo/client";
import { GET_FOLDERS_BY_TEAM } from "./useFolders";

const REMOVE_FOLDER = gql`
  mutation RemoveFolder($id: Int!) {
    removeFolder(id: $id) {
      id
      name
    }
  }
`;

export const useRemoveFolder = () => {
  const [removeFolder, { data, error }] = useMutation(REMOVE_FOLDER, {
    refetchQueries: [GET_FOLDERS_BY_TEAM],
  });

  return { removeFolder, data, error };
};
