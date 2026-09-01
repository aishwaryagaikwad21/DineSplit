export const calculateEqualSplit = (
    bill,
    totalMembers,
    memNames
) => {

    const baseAmount = Math.floor(
        bill.grandTotal / totalMembers
    );

    const remainder = bill.grandTotal % totalMembers;

    return memNames.map((mem, index) => {
        return {
            name: mem,
            amountOwed:
                baseAmount + (index < remainder ? 1 : 0)
        };
    });
};