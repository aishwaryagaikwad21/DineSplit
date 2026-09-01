import express from 'express'
import { findBill, billDetails } from '../controllers/customerController.js'

const Router = new express.Router()

Router.get('/bill/:bill_id/restaurants/:restaurant_id', findBill)
Router.post('/bill-details/:bill_id', billDetails)

export default Router