import jwt from 'jsonwebtoken'
import { Restaurant } from '../models/restaurant.js'
import 'dotenv/config'

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const restaurant = await Restaurant.findOne({_id: decoded._id, 'tokens.token': token})

        if(!restaurant){ 
            throw new Error()
        }

        req.restaurant = restaurant
        req.token = token
        next()
    }
    catch(err){
        res.status(401).send({error: 'Please authenticate'})
    }
}

export default auth