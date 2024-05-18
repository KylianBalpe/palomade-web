import { z } from "zod";

export const firstName = z.object({
  first_name: z.string().min(3).max(30).optional(),
});

export const lastName = z.object({
  last_name: z.string().min(1).max(30).optional(),
});

export const userName = z.object({
  username: z.string().min(1).optional(),
});

export const profilePicture = z.object({
  image: z.any(),
});

export const newPassword = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(100),
  newPassword: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(100),
  confirmNewPassword: z
    .string()
    .min(8, "Password must contain at least 8 character(s)")
    .max(100),
});
