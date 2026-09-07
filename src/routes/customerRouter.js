import express from 'express'
import { findFinalBill, billDetails, getSplitBill, updateSplitData } from '../controllers/customerController.js'

const Router = new express.Router()

Router.get('/bill/:bill_id/restaurants/:restaurant_id', findFinalBill)
Router.post('/bill-details/:bill_id', billDetails)
Router.get('/splitbill/:billId/restaurants/:restaurantId', getSplitBill)
Router.patch('/splitbill/:billId/restaurants/:restaurantId', updateSplitData)

export default Router