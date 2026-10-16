export const calculateItemWiseSplit = (
    bill,
    totalMembers,
    memNames,
    dishDetails
) => {

    //Validate top-level inputs
    if (!bill || !Array.isArray(bill.dishes)) {
        throw new Error("Invalid bill: dishes must be an array.");
    }

    if (!Number.isInteger(totalMembers) || totalMembers <= 0) {
        throw new Error("Total members must be a positive integer.");
    }

    if (
        !Array.isArray(memNames) ||
        memNames.length !== totalMembers ||
        memNames.some((name) => typeof name !== "string" || !name.trim()) ||
        new Set(memNames).size !== memNames.length
    ) {
        throw new Error("Member names must be valid and unique.");
    }

    if (!Array.isArray(dishDetails)) {
        throw new Error("Dish details must be an array.");
    }

    const members = {};

    // Initialise members
    memNames.forEach((name) => {
        members[name] = {
            name,
            amountOwed: 0,
            items: []
        };
    });

    // Process each dish
    bill.dishes.forEach((billDish) => {

        let getDishDetails;

        if(billDish.menu_id){ //if menu_id exists
            getDishDetails = dishDetails.find(
            (dish) => billDish.menu_id === dish.menu_id
        );
        }
        else{ //for scanned bills - when menu_id does not exists
           getDishDetails = dishDetails.find((dish) => billDish._id.toString() === dish.dishId);
        }

        if (!getDishDetails) {
            throw new Error(
                `No split details found for dish: ${billDish.dishName}`
            );
        }

        const people = getDishDetails.who_ordered;

        if (
            !Array.isArray(people) ||
            people.length === 0 ||
            people.some((name) => !Object.hasOwn(members, name)) ||
            new Set(people).size !== people.length
        ) {
            throw new Error(
                `Invalid member assignments for dish: ${billDish.dishName}`
            );
        }

        if (
            !Number.isFinite(billDish.itemTotal) ||
            billDish.itemTotal < 0
        ) {
            throw new Error(
                `Invalid item total for dish: ${billDish.dishName}`
            );
        }

        const amountPerPerson = Number(
            (billDish.itemTotal / people.length).toFixed(2)
        );

        people.forEach((name) => {

            members[name].amountOwed = Number(
                (
                    members[name].amountOwed +
                    amountPerPerson
                ).toFixed(2)
            );

            members[name].items.push({
                // menu_id: billDish.menu_id,
                dishname: billDish.dishName,
                amount: amountPerPerson
            });
        });
    });

    // Validate bill-level charges
    const charges = bill.additionalChargesTotal ?? 0;
    const discount = bill.discount?.amount ?? 0;

    if (
        !Number.isFinite(charges) ||
        charges < 0 ||
        !Number.isFinite(discount) ||
        discount < 0
    ) {
        throw new Error("Invalid charges or discount.");
    }

    const additionalChargesOwed = bill.additionalChargesTotal / totalMembers
    const discountOwed = bill.discount.amount / totalMembers;

    Object.values(members).forEach((member) => {
        member.amountOwed = Number(((member.amountOwed + additionalChargesOwed) - discountOwed).toFixed(2));
    });

    return Object.values(members);
};