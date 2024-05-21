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
  token: string;
  data: {
    username?: string;
    first_name?: string;
    last_name?: string;
  };
};

export type UploadImageRequest = {
  token: string;
  image: any;
};

export type UpdatePasswordRequest = {
  token: string;
  data: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
};

export type GetAllUsersRequest = {
  token: string;
  search?: string;
  page?: number;
};
