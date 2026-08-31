import express from 'express'
import { findBill } from '../controllers/customerController.js'

const Router = new express.Router()

Router.get('/bill/:id', findBill)

export default Router