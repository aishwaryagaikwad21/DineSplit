import { Restaurant } from '../models/restaurant.js'
import Menu from '../models/menu.js';
import menuSchema from '../validators/menuValidator.js';

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
        res.status(400).send(e)
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

export const uploadMenu = async (req, res) => {
     try {

        // Convert uploaded Buffer → string
        const fileContent = req.file.buffer.toString('utf-8')

        // Convert JSON string → JavaScript object
        const menu = JSON.parse(fileContent)

        // Validate menu
        const result = menuSchema.safeParse(menu)

        if (!result.success) {
            return res.status(400).send({
                message: 'Invalid menu format',
                errors: result.error.issues
            })
        }

        // Store the ORIGINAL file in MongoDB
        const menuFile = new Menu({
            restaurantId: req.restaurant._id,
            filename: req.file.originalname,
            content: req.file.buffer,
            contentType: req.file.mimetype
        })

        await menuFile.save()

        res.status(201).send({
            message: 'Menu uploaded successfully'
        })

    } catch (err) {

        res.status(400).send({
            message: err.message
        })
    }
}

export const getMenu = async (req, res) => {
    try{
        const file = await Menu.findFileByRestaurantId(req.restaurant._id)

        if(!file){
           return res.status(404).send('File not Found')
        }

        const menu = JSON.parse(file.content.toString('utf-8'))

        res.status(200).send(menu)
    }
    catch(e){
        res.status(400).send({error: e})
    }
}