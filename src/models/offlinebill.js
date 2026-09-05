import mongoose from "mongoose";

const offlineBillSchema = new mongoose.Schema({
    dishes: [{
        dishName:{
            type: String,
            required: true,
            trim: true
        },
        price:{
            type: Number,
            required: true
        },
        quantity:{
            type: Number, 
            required: true
        },
        itemTotal: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    tax:{
        type: Number,
        required: true
    },
    grandTotal:{
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
)


export const OfflineBill = mongoose.model('offlineBill', offlineBillSchema)