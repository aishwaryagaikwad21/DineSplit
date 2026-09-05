import mongoose from "mongoose";
import memberSchema from "./member.js";

const scannedSplitSchema = new mongoose.Schema({
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScannedBill',
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

export const ScannedSplit = mongoose.model('scannedSplit', scannedSplitSchema)