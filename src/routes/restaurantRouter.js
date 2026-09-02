import express from 'express'
import auth from '../middleware/auth.js'
import upload from '../middleware/upload.js';
import { registerRestaurant, getRestaurant, updateRestaurant, loginRestaurant, uploadMenu, getMenu, finalBill } from '../controllers/restaurantController.js';



const router = new express.Router()

router.post('/restaurants/register', registerRestaurant)
router.post('/restaurants/login', loginRestaurant)
router.get('/restaurant/profile', auth, getRestaurant)
router.patch('/restaurant/profile', auth, updateRestaurant)
router.post('/restaurant/menu', auth, upload.single('menu'), uploadMenu)
router.get('/restaurant/menu', auth, getMenu)
router.post('/restaurant/bill', auth, finalBill)

export default router

