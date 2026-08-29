import express from 'express'
import { registerRestaurant } from '../controllers/restaurantRegisterController.js';

const router = new express.Router()

router.post('/restaurants/register', registerRestaurant)

export default router

