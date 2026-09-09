//to validate Gemini's output
import { z } from "zod";

const extractedDishSchema = z.object({
    dishName: z.string(),
    price: z.number(),
    quantity: z.number(),
    itemTotal: z.number()
});

export const extractedBill = z.object({
    dishes: z.array(extractedDishSchema),
    subtotal: z.number().positive(),
    additionalCharges: z.record(z.string(), z.number().nonnegative()).default({}),
    discount: z.object({
        percent: z.string(),
        amount: z.number().nonnegative()
    }),
    grandTotal: z.number().positive()
})

