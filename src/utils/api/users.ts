import { LoginRequest } from "../type/users";

const baseUrl = process.env.BASE_URL;

export class User {
  static async login(request: LoginRequest) {
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
        throw new Error(response.errors);
      }
      const user = response.data;
      return user;
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  static async profile(token: string) {
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
}
