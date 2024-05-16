import { z } from "zod";

export const createShippingForm = z.object({
  landId: z
    .string({
      required_error: "Please select land where the shipping come from",
    })
    .transform((v) => Number(v) || 0),
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
