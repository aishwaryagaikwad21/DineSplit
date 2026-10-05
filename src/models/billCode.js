import mongoose from "mongoose"

const billCodeSchema = new mongoose.Schema({
    billCode: {
        type: String,
        required: true,
        unique: true
    },
    billId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScannedBill",
        required: true
    }
})

const BillCode = mongoose.model("BillCode", billCodeSchema)

export default BillCode