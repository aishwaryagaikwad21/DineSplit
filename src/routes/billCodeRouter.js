import express from 'express'
import { findBillDetails } from '../controllers/billCodeController.js'

const Router = new express.Router()

Router.get('/scanned-bill/billCode/:bill_code', findBillDetails)

export default Router