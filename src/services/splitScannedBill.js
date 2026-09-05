import { calculateEqualSplit } from "./split/equalSplit.js";
import { calculateItemWiseSplit } from "./split/itemWiseSplit.js";
import { createScannedSplit } from "./split/createSplit.js";


export const splitScannedBill = async ({
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
                    memNames,
                    dishDetails
                );
        }

        return await createScannedSplit({
                  bill,
                  totalMembers,
                  splitType,
                  members
        });

        
}





/* 

{
  _id: new ObjectId('6a9c292984c2ba92edf41a66'),
  dishes: [
    {
      dishName: 'Chocolate Scoop',
      price: 120,
      quantity: 2,
      itemTotal: 240,
      _id: new ObjectId('6a9c292984c2ba92edf41a67')
    },
    {
      dishName: 'Fudge Brownie Sundae',
      price: 180,
      quantity: 1,
      itemTotal: 180,
      _id: new ObjectId('6a9c292984c2ba92edf41a68')
    },
    {
      dishName: 'Strawberry Scoop',
      price: 120,
      quantity: 1,
      itemTotal: 120,
      _id: new ObjectId('6a9c292984c2ba92edf41a69')
    },
    {
      dishName: 'Butterscotch Scoop',
      price: 120,
      quantity: 1,
      itemTotal: 120,
      _id: new ObjectId('6a9c292984c2ba92edf41a6a')
    },
    {
      dishName: 'Chocolate Milkshake',
      price: 160,
      quantity: 2,
      itemTotal: 320,
      _id: new ObjectId('6a9c292984c2ba92edf41a6b')
    },
    {
      dishName: 'Waffle Cone',
      price: 40,
      quantity: 1,
      itemTotal: 40,
      _id: new ObjectId('6a9c292984c2ba92edf41a6c')
    }
  ],
  subtotal: 1020,
  tax: 51,
  grandTotal: 1071,
  createdAt: 2026-09-05T14:37:29.336Z,
  updatedAt: 2026-09-05T14:37:29.336Z,
  __v: 0
}
4 item-wise [ 'Aish', 'Sara', 'Alicia', 'Jane' ] [
  { dishname: 'Chocolate Scoop', who_ordered: [ 'Aish', 'Sara' ] },
  { dishname: 'Fudge Brownie Sundae', who_ordered: [ 'Alicia' ] },
  { dishname: 'Strawberry Scoop', who_ordered: [ 'Jane' ] },
  { dishname: 'Butterscotch Scoop', who_ordered: [ 'Sara' ] },
  { dishname: 'Chocolate Milkshake', who_ordered: [ 'Aish', 'Jane' ] },
  { dishname: 'Waffle Cone', who_ordered: [ 'Alicia' ] }
]
*/