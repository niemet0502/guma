export interface User {
  id: string | number;
  lastname?: string;
  firstname?: string;
  username: string;
  email?: string;
  password?: string;
  is_suspended?: boolean;
  first_signin?: boolean;
  profile_id?: number;
  profile?: ProfileApi;
}

interface ProfileApi {
  id: number;
  name: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  user_id: number;
  token: string;
  created_at: string;
  expired_at: string;
}

export enum UserProfileEnum {
  ADMIN = 1,
  USER = 2,
}
