import express from 'express'

import { image } from '../middleware/image.js'

import { scanBill, getBill, splitDetails } from '../controllers/scannedBillController.js'

const router = express.Router()

router.post('/scan',image.single("billImage"),scanBill)
router.get('/scanned-bill/:id', getBill)
router.post('/split-details/:id', splitDetails)

export default router;