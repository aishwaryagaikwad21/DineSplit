import { Restaurant } from '../models/restaurant.js'
import Menu from '../models/menu.js';
import menuSchema from '../validators/menuValidator.js';
import { Bill } from '../models/bill.js';

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
                res.status(404).send('Not found')
            }

            updates.forEach((update) => {
                restaurant[update] = req.body[update]
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
    try{
        const billDetails = new Bill({
            restaurantId: req.restaurant._id,
            tableNumber: req.body.tableNumber,
            dishes: req.body.dishes
        })
        
        await billDetails.save()
        res.status(200).send(billDetails)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
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