import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    tableNumber: {
        type: Number,
        trim: true
    },
    dishes: [{
        menu_id:{
            type: String,
            required: true,
            trim: true
        },
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

billSchema.pre('validate', function(next){
    const bill = this
    bill.dishes.forEach((dish) => {
        dish.itemTotal = dish.price * dish.quantity;
    })

    bill.subtotal = bill.dishes.reduce((total, dish) => total + dish.itemTotal, 0)

    const taxRate = 0.05

    bill.tax = bill.subtotal * taxRate

    bill.grandTotal = bill.subtotal + bill.tax
})

billSchema.statics.searchBill = async (bill_id, restaurant_id) => {
    const bill = await Bill.findOne({
        _id: bill_id,
        restaurantId: restaurant_id
    })
    if(!bill){
        throw new Error('Bill Not Found')
    }
    return bill
}

export const Bill = mongoose.model('Bill',billSchema)