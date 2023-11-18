import { gql, useMutation } from "@apollo/client";
import { UpdateFolderApi } from "../type";
import { GET_FOLDERS_BY_TEAM } from "./useFolders";
import { GET_FOLDER_BY_ID } from "./useGetFolder";

const UPDATE_FOLDER = gql`
  mutation updateFolder($updateFolderInput: UpdateFolderInput!) {
    updateFolder(updateFolderInput: $updateFolderInput) {
      id
      name
    }
  }
`;

export const useUpdateFolder = () => {
  const [updateFolderMutation, { error }] = useMutation(UPDATE_FOLDER, {
    refetchQueries: [GET_FOLDERS_BY_TEAM, GET_FOLDER_BY_ID],
  });

  const updateFolder = async (
    updateFolderInput: UpdateFolderApi,
    onSuccessCallback: () => void
  ) => {
    try {
      await updateFolderMutation({
        variables: { updateFolderInput },
      });
      onSuccessCallback();
    } catch (e) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", e);
    }
  };
  return { updateFolder, error };
};
