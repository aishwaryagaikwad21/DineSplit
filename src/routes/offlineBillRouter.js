import express from 'express'

import { image } from '../middleware/image.js'

import { scanOfflineBill } from '../controllers/offlineBillController.js'

const router = express.Router()

router.post('/scan',image.single("billImage"),scanOfflineBill)

export default router;