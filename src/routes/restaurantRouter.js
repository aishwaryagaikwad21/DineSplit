import express from 'express'
import auth from '../middleware/auth.js'
import { registerRestaurant, getRestaurant, loginRestaurant } from '../controllers/restaurantController.js';

const router = new express.Router()

router.post('/restaurants/register', registerRestaurant)
router.post('/restaurants/login', loginRestaurant)
router.get('/restaurants/profile', auth, getRestaurant)

export default router

