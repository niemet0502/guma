import { User } from "@/domains/auth/services/types";
import { TeamApi } from "@/domains/teams/type";
import { DocumentApi } from "../documents/type";

export interface FolderApi {
  id: number;
  name: string;
  created_by: number;

  team?: TeamApi;
  author?: User;
  documents?: DocumentApi[];
}

export interface CreateFolderInputApi {
  name: string;
  team_id: number;
}

export interface UpdateFolderApi {
  id: number;
  name: string;
}
