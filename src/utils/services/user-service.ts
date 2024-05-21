import {
  GetAllUsersRequest,
  LoginRequest,
  RegisterRequest,
  UpdatePasswordRequest,
  UpdateRequest,
  UploadImageRequest,
} from "../../types/user-type";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function login(request: LoginRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const response = await res.json();

    if (res.status !== 200) {
      console.error(response.errors);
    }
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Authentication failed");
  }
}

export async function getUser(token: string) {
  try {
    const res = await fetch(`${baseUrl}/api/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Failed to get user");
  }
}

export async function register(request: RegisterRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const response = await res.json();
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    return response;
  } catch (e) {
    throw new Error("Registration failed");
  }
}

export async function updateUser(request: UpdateRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.data),
    });
    return res;
  } catch (e) {
    throw new Error("Update failed");
  }
}

export async function uploadImage(request: UploadImageRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/picture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${request.token}`,
      },
      body: request.image,
    });

    return res;
  } catch (e) {
    throw new Error("Failed to upload image");
  }
}

export async function updatePassword(request: UpdatePasswordRequest) {
  try {
    const res = await fetch(`${baseUrl}/api/password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${request.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.data),
    });

    return res;
  } catch (e) {
    throw new Error("Failed to update password");
  }
}

export async function allUsers(request: GetAllUsersRequest) {
  try {
    const res = await fetch(
      `${baseUrl}/api/users?search=${request.search}&size=10&page=${request.page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${request.token}`,
        },
      },
    );

    return res;
  } catch (e) {
    throw new Error("Failed to get all users");
  }
}
