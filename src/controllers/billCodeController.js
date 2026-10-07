import { ScannedBill } from "../models/scanbill.js"
import BillCode from "../models/billCode.js"

export const findBillDetails = async(req, res) => {
    const billCode = req.params.bill_code

    try{
        const billCodeDoc = await BillCode.findOne({billCode})
        if (!billCodeDoc) {
            return res.status(404).json({
                message: "Invalid bill code"
            });
        }

        const billId = billCodeDoc.billId

        const getBill = await ScannedBill.findById({_id: billId})

        if(!getBill){
            return res.status(404).json({
                message: "Bill not found"
            })
        }

        return res.status(200).json(getBill)
    }
    catch(err){
        return res.status(500).json({
            message: "Failed to retrieve bill",
            error: err.message
        });
    }
}