import { Restaurant } from '../models/restaurant.js'


export const registerRestaurant = async (req, res) => {

    const restaurant = new Restaurant(req.body);

    try {
        const savedRestaurant = await restaurant.save();
        const token = await savedRestaurant.generateAuthToken()
        res.status(201).send({ savedRestaurant, token });
    }
    catch (e) {
        res.status(400).send({
            error: 'Error Occurred'
        });
    }
};

export const getRestaurant = async (req, res) => {
    try{
        res.send(req.restaurant)
    }
    catch(e){
        res.status(500).send(e)
    }
}

export const loginRestaurant = async (req, res) => {
    try{
        const restaurant = await Restaurant.findByCredentials(req.body.email, req.body.password)
        const token = await restaurant.generateAuthToken();
        res.status(200).send({restaurant, token})
    }
    catch(err){
        res.status(401).send(err)
    }
}