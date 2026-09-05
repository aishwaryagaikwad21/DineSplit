import express from 'express'

import { image } from '../middleware/image.js'

import { scanOfflineBill, getBill, splitDetails } from '../controllers/offlineBillController.js'

const router = express.Router()

router.post('/scan',image.single("billImage"),scanOfflineBill)
router.get('/scanned-bill/:id', getBill)
router.post('/split-details/:id', splitDetails)

export default router;