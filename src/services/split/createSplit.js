import { Split } from "../../models/split.js";
import { ScannedSplit } from "../../models/scannedsplit.js";

export const createSplit = async ({
    bill,
    splitType,
    totalMembers,
    members
}) => {

    const splitBillDetails = new Split({
        billId: bill._id,
        restaurantId: bill.restaurantId,
        totalMembers,
        splitType,
        members,
        totalAmount: bill.grandTotal
    });

    await splitBillDetails.save();

    return splitBillDetails;
};


export const createScannedSplit = async({
    bill,
    totalMembers,
    splitType,
    members
}) => {
    const splitBillDetails = new ScannedSplit({
        billId: bill._id,
        totalMembers,
        splitType,
        members,
        totalAmount: bill.grandTotal
    });

    await splitBillDetails.save();

    return splitBillDetails;
}