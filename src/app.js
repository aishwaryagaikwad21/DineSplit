//responsible for Express configuration
import express from 'express'
import restaurantRouter  from './routes/restaurantRouter.js'
import customerRouter from './routes/customerRouter.js'
import offlineBill from './routes/offlineBillRouter.js'

const app = express()

app.use(express.json())

app.use(restaurantRouter)
app.use(customerRouter)
app.use(offlineBill)

export default app; 
