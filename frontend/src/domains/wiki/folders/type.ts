import { User } from "@/domains/auth/services/types";
import { DocumentApi } from "../documents/type";

export interface FolderApi {
  id: number;
  name: string;
  created_by: number;

  author?: User;
  documents?: DocumentApi[];
}

export interface CreateFolderInputApi {
  name: string;
  team_id: number;
}
