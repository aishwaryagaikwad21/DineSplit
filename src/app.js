//responsible for Express configuration
import express from 'express'
import restaurantRouter  from './routes/restaurantRouter.js'

const app = express()

app.use(express.json())

app.use(restaurantRouter)

export default app; 
