import mongoose from 'mongoose'

const { Schema } = mongoose;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    address:{
        type: String,
        required: true,
        trim: true,
        minLength: 1
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    socialMediaHandles:{
        type: Map,
        of: String
    },
    // tokens: [{
    //     token: {
    //         type: String,
    //         required: true
    //     }
    // }]
})

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)


