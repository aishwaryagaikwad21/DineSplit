import mongoose from 'mongoose'
import 'dotenv/config';
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

restaurantSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({_is: user._id.toString()}, process.env.JWT_SECRET)
    
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

restaurantSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await argon2.hash(user.password);
    }
})

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)


