import express from 'express'
import auth from '../middleware/auth.js'
import { registerRestaurant, getRestaurant } from '../controllers/restaurantController.js';

const router = new express.Router()

router.post('/restaurants/register', registerRestaurant)
router.get('/restaurants/profile', auth, getRestaurant)

export default router

