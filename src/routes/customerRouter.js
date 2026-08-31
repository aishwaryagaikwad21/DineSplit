import express from 'express'
import { findBill } from '../controllers/customerController.js'

const Router = new express.Router()

Router.get('/bill', findBill)

export default Router