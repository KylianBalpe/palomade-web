import { z } from "zod";

export const createShippingForm = z.object({
  landId: z.string({
    required_error: "Please select land where the shipping come from",
  }),
  weight: z
    .string({
      required_error: "Please enter the weight of the shipping",
      message: "Weight cannot be 0",
    })
    .transform((v) => Number(v) || 0)
    .refine((v) => v !== 0, {
      message: "Weight cannot be 0",
    }),
});

export const weightForm = z.object({
  weight: z
    .string({
      required_error: "Please enter the weight of the shipping",
      message: "Weight cannot be 0",
    })
    .transform((v) => Number(v) || 0)
    .refine((v) => v !== 0, {
      message: "Weight cannot be 0",
    }),
});

export const startForm = z.object({
  landId: z.string({
    required_error: "Please select land where the shipping come from",
  }),
});

export const assignDriver = z.object({
  email: z.string({
    required_error: "Please select a driver!",
  }),
});
