import mongoose from "mongoose";
import memberSchema from "./member.js";

const offlineSplitSchema = new mongoose.Schema({
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

export const OfflineSplit = mongoose.model('OfflineSplit', offlineSplitSchema)