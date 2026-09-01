import { Split } from "../../models/split.js";

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