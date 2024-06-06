import { z } from "zod";

export const updateEmployeeForm = z.object({
  role: z.string({
    required_error: "Please select role to update.",
  }),
});

export const addEmployeeForm = z.object({
  email: z
    .string({
      required_error: "Please enter email address.",
    })
    .email(),
  role: z.string({
    required_error: "Please select role to add employee.",
  }),
});

export const companyLogo = z.object({
  logo: z.any(),
});

export const updateCompanyNameForm = z.object({
  name: z
    .string({ required_error: "Company name cannot be empty." })
    .min(5, "Company name must contain at least 5 character"),
});

export const updateCompanyAddressForm = z.object({
  address: z
    .string({ required_error: "Company address cannot be empty." })
    .min(5, "Company address must contain at least 5 character"),
});

export const updateCompanyDescriptionForm = z.object({
  description: z
    .string({
      required_error: "Company description cannot be empty.",
    })
    .min(5, "Company description must contain at least 5 character"),
});

export const updateCompanyCoordinatesForm = z.object({
  coordinates: z
    .string({
      required_error: "Company coordinates cannot be empty.",
    })
    .min(6, "Company coordinates must contain at least 6 character"),
});

export const companyRequestForm = z.object({
  name: z
    .string()
    .min(5, "Comapny name must contain at least 2 character")
    .max(50),
  address: z
    .string()
    .min(5, "Company address must contain at least 5 character"),
  coordinates: z
    .string()
    .min(6, "Company coordinates must contain at least 6 character"),
  description: z
    .string()
    .min(5, "Company description must contain at least 5 character"),
  requestedBy: z.string().email(),
});
