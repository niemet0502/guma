export interface User {
  id: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  is_suspended: boolean;
  first_signin: boolean;
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
