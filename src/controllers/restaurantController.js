import { Restaurant } from '../models/restaurant.js'
import Menu from '../models/menu.js';
import menuSchema from '../validators/menuValidator.js';
import { Bill } from '../models/bill.js';
import { restaurantRegValidation, restaurantUpdateValidation } from '../validators/restaurantValidators.js';
import { loginValidation } from '../validators/loginValidator.js';
import { billValidation } from '../validators/billValidation.js';


export const registerRestaurant = async (req, res) => {

    const result = restaurantRegValidation.safeParse(req.body)
    if (!result.success) {
            return res.status(400).send({
                message: 'Invalid input',
                errors: result.error.issues
            })
    }

    const restaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: req.body.password,
        socialMediaHandles: req.body.socialMediaHandles
    });

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

export const updateRestaurant = async (req, res) => {
    try{
        
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'address', 'email', 'password', 'socialMediaHandles']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(400).send({error:'Invalid update'})
        }

        try{
            const restaurant = req.restaurant
             if(!restaurant){
                return res.status(404).send('Not found')
            }

            const result = restaurantUpdateValidation.safeParse(req.body)
            if(!result.success){
                return res.status(400).send({
                    message: 'Invalid Input',
                    errors: result.error.issues
                })
            }

            updates.forEach((update) => {
                restaurant[update] = result.data[update]
            })

            await restaurant.save()
            res.status(200).send(restaurant)
        }
        catch(err){

        }

    }
    catch(err){

    }
}

export const deleteRestaurant = async (req, res) => {
    try{
        await req.restaurant.deleteOne()
        res.status(200).send(req.restaurant)
    }
    catch(err){
        res.status(500).send(err)
    }
}

export const loginRestaurant = async (req, res) => {

    const result = loginValidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).send({
            message: 'Invalid inputs',
            errors: result.error.issues
        })
    }

    try{
        const restaurant = await Restaurant.findByCredentials(result.data.email, result.data.password)
        const token = await restaurant.generateAuthToken();
        res.status(200).send({restaurant, token})
    }
    catch(err){
        res.status(401).send({
            message: "Invalid email or password"
        })
    }
}

export const uploadMenu = async (req, res) => {
     try {

        if (!req.file) {
            return res.status(400).send({message: 'Menu file is required'})
        }

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

export const replaceMenu = async (req, res) => {
    try {

        if(!req.file){
            return res.status(400).send({message: 'Menu file is required'})
        }

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

        // Find existing menu
        const existingMenu = await Menu.findOne({
            restaurantId: req.restaurant._id
        })

        if (!existingMenu) {
            return res.status(404).send({
                message: 'No existing menu found. Use POST to upload a menu.'
            })
        }

        // Replace existing menu
        existingMenu.filename = req.file.originalname
        existingMenu.content = req.file.buffer
        existingMenu.contentType = req.file.mimetype

        await existingMenu.save()

        res.status(200).send({
            message: 'Menu replaced successfully'
        })

    } catch (err) {
        res.status(400).send({
            message: err.message
        })
    }
}

export const finalBill = async (req, res) => {

    const result = billValidation.safeParse(req.body)
    if(!result.success){
        return res.status(400).send({
            message: 'Invalid inputs',
            errors: result.error.issues
        })
    }

    const { tableNumber, dishes } = result.data;

    try{
        const billDetails = new Bill({
            restaurantId: req.restaurant._id,
            tableNumber,
            dishes
        })
        
        await billDetails.save()
        res.status(200).send(billDetails)
    }
    catch(err){
        console.log(err);
        return res.status(500).send({
            message: "Failed to create bill"
        });
    }
}

export const cancelBill = async(req, res) => {
    const id = req.params.id
    const bill = await Bill.findById({_id: id})
    if(!bill){
       return res.status(404).send('Bill not found')
    }

    await bill.deleteOne()
    res.status(200).send(bill)

}