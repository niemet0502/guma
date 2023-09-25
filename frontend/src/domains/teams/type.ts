import { User } from "../auth/services/types";

export enum TeamVisibility {
  PRIVATE = 1,
  PUBLIC = 0,
}

export interface TeamApi {
  id: number;
  organization_id: number;
  name: string;
  icon?: string;
  identifier?: string;
  visibility: TeamVisibility;
  members: MemberApi[];
}

export interface MemberApi {
  id: number;
  team_id: number;
  team: TeamApi;
  user_id: number;
  user: User;
  created_at: Date;
}
