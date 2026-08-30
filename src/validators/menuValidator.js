import { z } from 'zod'

const menuSchema = z.array(
    z.object({
        menu_id: z.string(),
        dishname: z.string(),
        price: z.number().positive()
    })
)

export default menuSchema