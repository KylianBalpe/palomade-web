import { z } from "zod";

export const addLandsForm = z.object({
  name: z
    .string({
      required_error: "Please enter the name of the land.",
    })
    .min(3, "Name land must be at least 3 characters."),
  address: z
    .string({
      required_error: "Please enter the address of the land.",
    })
    .min(4, "Address land must be at least 4 characters."),
  coordinates: z
    .string({
      required_error: "Please enter the coordinates of the land.",
    })
    .min(6, "Coordinates land must be at least 6 characters."),
});

export const updateLandsNameForm = z.object({
  name: z
    .string({
      required_error: "Please enter the name of the land.",
    })
    .min(3, "Name land must be at least 3 characters."),
});

export const updateLandsAdressForm = z.object({
  address: z
    .string({
      required_error: "Please enter the address of the land.",
    })
    .min(4, "Address land must be at least 4 characters."),
});

export const updateLandsCoordinatesForm = z.object({
  coordinates: z
    .string({
      required_error: "Please enter the coordinates of the land.",
    })
    .min(6, "Coordinates land must be at least 6 characters."),
});
