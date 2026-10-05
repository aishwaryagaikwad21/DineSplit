import BillCode from "../models/billCode.js";

export const generateShortBillCode = async () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

    while (true) {
        let code = "DS-"

        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)]
        }

        const existingCode = await BillCode.findOne({
            billCode: code
        })

        if (!existingCode) {
            return code
        }
    }
}