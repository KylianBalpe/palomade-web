import {
  LoginRequest,
  RegisterRequest,
  UpdateRequest,
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

export async function refresh(token: string) {
  try {
    const res = await fetch(`${baseUrl}/api/refresh`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await res.json();
    console;
    if (res.status !== 200) {
      throw new Error(response.errors);
    }
    const user = response.data;
    return user;
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
}

export async function register(request: RegisterRequest, token: string) {
  try {
    const res = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
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
    throw new Error("Update failed");
  }
}
