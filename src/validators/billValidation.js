import { z } from "zod";

export const dishSchema = z.object({
    menu_id: z.string().trim().min(1, "Menu ID is required"),
    dishName: z.string().trim().min(1, "Dish name is required"),
    price: z.number().nonnegative("Price cannot be negative"),
    quantity: z.number().positive("Quantity must be greater than 0")
});

export const billValidation = z.object({
    tableNumber: z.number("Table number should be a number").positive("Table number must be positive"),
    dishes: z.array(dishSchema).min(1, "At least one dish is required"),
    additionalCharges: z.record(z.string(), z.number()).default({}),

    discount: z.object({
        percent: z.string().default("0%"),
        amount: z.number().default(0)
    }).default({
        percent: "0%",
        amount: 0
    })
});