export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

export type UpdateRequest = {
  username?: string;
  first_name?: string;
  last_name?: string;
};
