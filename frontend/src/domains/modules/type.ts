import { User } from "../auth/services/types";
import { DocumentApi } from "../wiki/documents/type";

export enum LivrableStatusEnum {
  Planned = 0,
  InProgress = 1,
  Pause = 2,
  Completed = 3,
}

export interface LivrableApi {
  id: number;
  name: string;
  description?: string;
  end_at: string;
  start_at: string;
  status: number;
  team_id: number;
  created_by?: number;
  author: User;
  updates: [Livrableupdate];
  documents: [DocumentApi];
}

export interface Livrableupdate {
  id: number;
  status: number;
  description: string;
  created_by?: number;
  livrable_id: number;
  created_at: string;
  livrable: LivrableApi;
}

export interface CreateLivrableupdateInput {
  status: number;
  description: string;
  livrable_id: number;
  created_by?: number;
}

export interface CreateLivrableInput {
  name: string;
  description: string;
  end_at: string;
  start_at: string;
  status: number;
  team_id: number;
  created_by?: number;
}

export interface UpdateLivrableInput {
  name: string;
  description: string;
  end_at: string;
  start_at: string;
  status: number;
  team_id: number;
  created_by?: number;
  id: number;
}

export interface UpdateLivrableupdateInput {
  status: number;
  description: string;
  livrable_id: number;
  created_by?: number;
  id: number;
}
