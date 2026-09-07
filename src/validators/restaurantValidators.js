import { z } from "zod";

export const restaurantRegValidation = z.object({
    name: z.string().trim().min(1, "Restaurant name is required"),
    address: z.string().trim().min(1,"Address is required"),
    email: z.email().trim().toLowerCase(),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"),
    socialMediaHandles: z.record(
        z.string(),
        z.string()
    )
})

export const restaurantUpdateValidation =
    restaurantRegValidation.partial();

//extends validation to update request too