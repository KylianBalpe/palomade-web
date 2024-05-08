import { DefaultSession, Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      refreshToken: string;
      accessToken: string;
      exp: number;
    } & DefaultSession["User"];
  }

  type User = {
    id: number;
    email: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    role: string;
    picture: string;
    companyName: string;
    companyId: string;
    companyStringId: string;
  };
}
