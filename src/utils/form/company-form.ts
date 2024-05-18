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
  name: z.string().optional(),
});

export const updateCompanyAddressForm = z.object({
  address: z.string().optional(),
});

export const updateCompanyDescriptionForm = z.object({
  description: z.string().optional(),
});

export const updateCompanyCoordinatesForm = z.object({
  coordinates: z.string().optional(),
});
