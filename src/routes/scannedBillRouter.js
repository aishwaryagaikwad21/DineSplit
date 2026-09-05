import express from 'express'

import { image } from '../middleware/image.js'

import { scanBill, getBill, splitDetails, finalSplitBill } from '../controllers/scannedBillController.js'

const router = express.Router()

router.post('/scan',image.single("billImage"),scanBill)
router.get('/scanned-bill/:id', getBill)
router.post('/split-details/:id', splitDetails)
router.get('/final-split-bill/:id', finalSplitBill)

export default router;