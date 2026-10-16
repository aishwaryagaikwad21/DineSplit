
import { z } from "zod";

// Validate and normalize Gemini's output
const extractedDishSchema = z.object({
    dishName: z.string(),
    price: z.coerce.number().nonnegative(),
    quantity: z.coerce.number().positive(),
    itemTotal: z.coerce.number().nonnegative()
});

export const extractedBill = z.object({
    dishes: z.array(extractedDishSchema),
    subtotal: z.coerce.number().nonnegative(),
    additionalCharges: z.record(
        z.string(),
        z.coerce.number().nonnegative()
    ).default({}),
    discount: z.object({
        percent: z.string(),
        amount: z.coerce.number().nonnegative()
    }),
    grandTotal: z.coerce.number().nonnegative()
});

export const updateBillSchema = extractedBill.partial();
