import { User } from "@/domains/auth/services/types";
import { TeamApi } from "@/domains/teams/type";

export interface DocumentApi {
  id: number;
  name: string;
  folder_id?: number;
  team_id: number;
  team: TeamApi;
  content?: string;
  // status:
  created_by: number;
  author?: User;
  created_at: string;
  updated_at: string;
}
