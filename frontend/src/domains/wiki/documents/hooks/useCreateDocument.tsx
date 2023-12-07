import { gql, useMutation } from "@apollo/client";
import { GET_FOLDER_BY_ID } from "../../folders/hooks/useGetFolder";
import { CreateDocumentInputApi } from "../type";
import { GET_DOCUMENTS_BY_TEAM } from "./useDocuments";

const CREATE_DOCUMENT = gql`
  mutation CreateDocument($createDocumentInput: CreateDocumentInput!) {
    createDocument(createDocumentInput: $createDocumentInput) {
      id
      name
    }
  }
`;

export const useCreateDocument = () => {
  const [createDocumentMutation, { data, error }] = useMutation(
    CREATE_DOCUMENT,
    {
      refetchQueries: [GET_DOCUMENTS_BY_TEAM, GET_FOLDER_BY_ID],
    }
  );

  const createDocument = async (
    createDocumentInput: CreateDocumentInputApi,
    onSuccessCallback: () => void
  ) => {
    try {
      const response = await createDocumentMutation({
        variables: { createDocumentInput },
      });

      // Check the response for success and handle accordingly
      if (response.data && response.data.createDocument) {
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
  return { createDocument, data, error };
};
