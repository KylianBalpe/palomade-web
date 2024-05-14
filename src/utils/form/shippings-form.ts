import { z } from "zod";

export const createShippingForm = z.object({
  landId: z
    .string({
      required_error: "Please select land where the shipping come from",
    })
    .min(1),
  weight: z
    .string({
      required_error: "Please enter the weight of the shipping",
    })
    .min(1),
});

export const submitCreateShipping = z.object({
  landId: z.number(),
  weight: z.number(),
});
