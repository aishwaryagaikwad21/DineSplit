import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },

    filename: {
        type: String,
        required: true
    },

    content: {
        type: Buffer,
        required: true
    },

    contentType: {
        type: String,
        required: true
    }
})


menuSchema.statics.findFileByRestaurantId = async (id) => {
    const file = await Menu.findOne({restaurantId: id})

    if(!file){
        throw new Error('File not found')
    }

    return file
}

const Menu = mongoose.model('Menu', menuSchema)

export default Menu