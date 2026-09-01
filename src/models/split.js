import mongoose from "mongoose";
import memberSchema from "./member.js";

const splitSchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    totalMembers:{
        type: Number,
        required: true
    },
    splitType: {
        type: String,
        required: true,
        enum: ['equal', 'item-wise']
    },
    members: [memberSchema],

    totalAmount: {
        type: Number,
        required: true
    }
})

export const Split = mongoose.model('Split', splitSchema)