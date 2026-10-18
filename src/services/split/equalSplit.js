export const calculateEqualSplit = (
    bill,
    totalMembers,
    memNames
) => {

    if (
        !bill ||
        !Number.isFinite(bill.grandTotal) ||
        bill.grandTotal < 0
    ) {
        throw new Error("Invalid bill total.");
    }

     if (
        !Number.isInteger(totalMembers) ||
        totalMembers <= 0 ||
        !Array.isArray(memNames) ||
        memNames.length !== totalMembers
    ) {
        throw new Error("Invalid members for equal split.");
    }

    // Convert rupees to integer paise
    const totalPaise = Math.round(bill.grandTotal * 100);

    const basePaise = Math.floor(totalPaise / totalMembers);
    const remainderPaise = totalPaise % totalMembers;

    return memNames.map((mem, index) => {
        const memberPaise =
            basePaise + (index < remainderPaise ? 1 : 0);

        return {
            name: mem,
            amountOwed: memberPaise / 100
        };
    });
};