export const calculateItemWiseSplit = (
    bill,
    memNames,
    dishDetails
) => {

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
            getDishDetails = dishDetails.find(
                (dish) => billDish.dishName === dish.dishname)
        }

        const people = getDishDetails.who_ordered;

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

    return Object.values(members);
};