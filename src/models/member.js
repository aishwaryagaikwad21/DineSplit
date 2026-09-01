import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    amountOwed: {
        type: Number,
        required: true
    },

    items: [ //if split is equal then no need to fill items, hence not required
        {
            menu_id: String,
            dishname: String,
            amount: Number
        }
    ]
})

export default memberSchema