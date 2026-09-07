import {z} from 'zod'

export const loginValidation = z.object({
    email: z.string().trim().email("Invalid email!"),
    password: z.string().trim().min("8", "Password required!")
})