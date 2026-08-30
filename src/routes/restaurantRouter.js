import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js';
import { registerRestaurant, getRestaurant, loginRestaurant, uploadMenu } from '../controllers/restaurantController.js';



const router = new express.Router()

router.post('/restaurants/register', registerRestaurant)
router.post('/restaurants/login', loginRestaurant)
router.get('/restaurants/profile', auth, getRestaurant)
router.post('/restaurants/menu', auth, upload.single('menu'), uploadMenu)

export default router

