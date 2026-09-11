import { Split } from "../../models/split.js";
import { ScannedSplit } from "../../models/scannedsplit.js";

export const createSplit = async ({
    bill,
    splitType,
    totalMembers,
    memNames,
    dishDetails,
    members
}) => {

    const splitBillDetails = await Split.findOneAndUpdate(
        {
            billId: bill._id,
            restaurantId: bill.restaurantId
        },
        {
            billId: bill._id,
            restaurantId: bill.restaurantId,
            splitType,
            totalMembers,
            memNames,
            dishDetails,
            members,
            totalAmount: bill.grandTotal
        },
        {
            new: true,
            upsert: true,
            runValidators: true
        }
    );

    return splitBillDetails;
};


export const createScannedSplit = async({
    bill,
    totalMembers,
    splitType,
    members,
    dishDetails
}) => {
    const splitBillDetails = new ScannedSplit({
        billId: bill._id,
        totalMembers,
        splitType,
        dishDetails,
        members,
        totalAmount: bill.grandTotal
    });

    await splitBillDetails.save();

    return splitBillDetails;
}