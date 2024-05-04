"use client";

import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session, status, update } = useSession();

  const refreshToken = async () => {
    const res = await fetch("https://api-service.palomade.my.id/", {});
  };
};
