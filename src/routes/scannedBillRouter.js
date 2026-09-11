import express from 'express'

import { image } from '../middleware/image.js'

import { scanBill, confirmBill, getBill, updateBill, splitDetails, updateSplitDetails, finalSplitBill } from '../controllers/scannedBillController.js'

const router = express.Router()

router.post('/scan',image.single("billImage"),scanBill)
router.post('/confirm-bill', confirmBill)
router.get('/scanned-bill/:id', getBill)
router.put('/update-scanned-bill/:id', updateBill)
router.post('/split-details/:id', splitDetails)
router.put('/updated-scanned-split/:id', updateSplitDetails);
router.get('/final-split-bill/:id', finalSplitBill)

export default router;