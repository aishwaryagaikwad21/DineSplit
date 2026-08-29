import { Restaurant } from '../models/restaurant.js'

export const registerRestaurant = async (req, res) => {

    const restaurant = new Restaurant(req.body);

    try {
        const savedRestaurant = await restaurant.save();
        res.status(201).send(savedRestaurant);
    }
    catch (e) {
        //console.log(e);
        res.status(400).send({
            error: 'Error Occurred'
        });
    }
};