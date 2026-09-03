//to validate Gemini's output
import { z } from "zod";

export const extractedDishSchema = z.object({
    dishName: z.string(),
    price: z.number(),
    quantity: z.number()
});

export const extractedDishesSchema =
    z.array(extractedDishSchema);