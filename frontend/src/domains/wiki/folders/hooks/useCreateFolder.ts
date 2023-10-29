import { gql, useMutation } from "@apollo/client";
import { CreateFolderInputApi } from "../type";
import { GET_FOLDERS_BY_TEAM } from "./useFolders";

const CREATE_FOLDER = gql`
  mutation CreateFolder($createFolderInput: CreateFolderInput!) {
    createFolder(createFolderInput: $createFolderInput) {
      id
      name
    }
  }
`;

export const useCreateFolder = () => {
  const [createFolderMutation, { data, error }] = useMutation(CREATE_FOLDER, {
    refetchQueries: [GET_FOLDERS_BY_TEAM],
  });

  const createFolder = async (
    createFolderInput: CreateFolderInputApi,
    onSuccessCallback: () => void
  ) => {
    try {
      const response = await createFolderMutation({
        variables: { createFolderInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createFolder) {
        onSuccessCallback();
      } else {
        // Handle unexpected response or error
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      // Handle GraphQL errors or HTTP errors here
      console.error("Error creating user:", error);
    }
  };
  return { createFolder, data, error };
};
