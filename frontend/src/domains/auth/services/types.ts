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
