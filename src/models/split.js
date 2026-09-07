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
    splitType: {
        type: String,
        required: true,
        enum: ['equal', 'item-wise']
    },
    totalMembers:{
        type: Number,
        required: true
    },

     memNames: [{
        type: String,
        required: true,
        trim: true
    }],

    dishDetails: [{
        menu_id: {
            type: String,
            required: true,
            trim: true
        },

        who_ordered: [{
            type: String,
            required: true,
            trim: true
        }]
    }],

    members: [memberSchema],

    totalAmount: {
        type: Number,
        required: true
    }
})

export const Split = mongoose.model('Split', splitSchema)