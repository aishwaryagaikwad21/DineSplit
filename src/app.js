//responsible for Express configuration
import express from 'express'
import restaurantRouter  from './routes/restaurantRouter.js'
import customerRouter from './routes/customerRouter.js'
import scannedBill from './routes/scannedBillRouter.js'

const app = express()

app.use(express.json())

app.use(restaurantRouter)
app.use(customerRouter)
app.use(scannedBill)

export default app; 
