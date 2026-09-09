import mongoose from "mongoose";

const scannedBillSchema = new mongoose.Schema({
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
    additionalCharges:{
        type: Map,
        of: Number,
        default: new Map()
    },
     additionalChargesTotal: {
        type: Number,
        required: true,
        default: 0
    },
    discount:{
        percent: {
            type: String,
            default: "0%"
        },
        amount: {
            type: Number,
            default: 0
        }
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

scannedBillSchema.pre('validate', function(next){
    const bill = this
    bill.dishes.forEach((dish) => {
        dish.itemTotal = dish.price * dish.quantity;
    })

    bill.subtotal = bill.dishes.reduce((total, dish) => total + dish.itemTotal, 0)

    bill.additionalChargesTotal = [...bill.additionalCharges.values()].reduce((total, charge) => total + charge, 0);
    
    bill.grandTotal = bill.subtotal + bill.additionalChargesTotal - bill.discount.amount;

})


export const ScannedBill = mongoose.model('scannedBill', scannedBillSchema)