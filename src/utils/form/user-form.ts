import { z } from "zod";

export const firstName = z.object({
  first_name: z
    .string()
    .min(3, "First name must contain at least 3 characters")
    .max(30, "First name cannot contain more than 30 characters"),
});

export const lastName = z.object({
  last_name: z
    .string()
    .min(3, "Last name must contain at least 3 characters")
    .max(30, "Last name cannot contain more than 30 characters"),
});

export const userName = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(30, "Username cannot contain more than 30 characters")
    .refine((s) => !s.includes(" "), {
      message: "Username cannot contain space",
    }),
});

export const profilePicture = z.object({
  image: z.any(),
});

export const newPassword = z.object({
  oldPassword: z
    .string()
    .min(8, "Old password must contain at least 8 character(s)")
    .max(100),
  newPassword: z
    .string()
    .min(8, "New password must contain at least 8 character(s)")
    .max(100),
  confirmNewPassword: z
    .string()
    .min(8, "Confirm new password must contain at least 8 character(s)")
    .max(100),
});
