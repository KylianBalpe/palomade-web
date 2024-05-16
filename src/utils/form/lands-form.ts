import { z } from "zod";

export const addLandsForm = z.object({
  name: z
    .string({
      required_error: "Please enter the name of the land.",
    })
    .min(3),
  address: z
    .string({
      required_error: "Please enter the address of the land.",
    })
    .min(4),
  coordinates: z
    .string({
      required_error: "Please enter the coordinates of the land.",
    })
    .min(6),
});

export const updateLandsNameForm = z.object({
  name: z
    .string({
      required_error: "Please enter the name of the land.",
    })
    .min(3)
    .optional(),
});

export const updateLandsAdressForm = z.object({
  address: z
    .string({
      required_error: "Please enter the address of the land.",
    })
    .min(4)
    .optional(),
});

export const updateLandsCoordinatesForm = z.object({
  coordinates: z
    .string({
      required_error: "Please enter the coordinates of the land.",
    })
    .min(6)
    .optional(),
});
