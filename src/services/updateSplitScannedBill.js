import { calculateEqualSplit } from "./split/equalSplit.js";
import { calculateItemWiseSplit } from "./split/itemWiseSplit.js";
import { updateScannedSplit } from "./split/createSplit.js";

export const updatingSplitScannedBill = async ({
    bill,
    totalMembers,
    splitType,
    memNames,
    dishDetails
}) => {
    let members;
    
        if (splitType === "equal") {
            members = calculateEqualSplit(
                bill,
                totalMembers,
                memNames
            );
        }

        if (splitType === "item-wise") {
                members = calculateItemWiseSplit(
                    bill,
                    totalMembers,
                    memNames,
                    dishDetails
                );
        }

    return await updateScannedSplit({
        bill,
        totalMembers,
        splitType,
        members,
        dishDetails
    })
}