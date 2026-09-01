import { calculateEqualSplit } from "./split/equalSplit.js";
import { calculateItemWiseSplit } from "./split/itemWiseSplit.js";
import { createSplit } from "./split/createSplit.js";

export const splitBill = async ({
    bill,
    splitType,
    totalMembers,
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

    return await createSplit({
        bill,
        splitType,
        totalMembers,
        members
    });
};

/* 
{
  _id: new ObjectId('6a96cbb3932ae5b0ac5417e5'),
  restaurantId: new ObjectId('6a92d3b5fa1d38aed5c9c3e3'),
  tableNumber: 7,
  dishes: [
    {
      menu_id: 'IC001',
      dishName: 'Vanilla Bean',
      price: 120,
      quantity: 2,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417e6'),
      itemTotal: 240
    },
    {
      menu_id: 'IC002',
      dishName: 'Chocolate Fudge',
      price: 140,
      quantity: 3,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417e7'),
      itemTotal: 420
    },
    {
      menu_id: 'IC003',
      dishName: 'Strawberry Swirl',
      price: 130,
      quantity: 2,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417e8'),
      itemTotal: 260
    },
    {
      menu_id: 'IC005',
      dishName: 'Butterscotch Crunch',
      price: 140,
      quantity: 1,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417e9'),
      itemTotal: 140
    },
    {
      menu_id: 'IC007',
      dishName: 'Pistachio',
      price: 160,
      quantity: 2,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417ea'),
      itemTotal: 320
    },
    {
      menu_id: 'IC008',
      dishName: 'Coffee Mocha',
      price: 150,
      quantity: 1,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417eb'),
      itemTotal: 150
    },
    {
      menu_id: 'IC012',
      dishName: 'Belgian Chocolate',
      price: 170,
      quantity: 2,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417ec'),
      itemTotal: 340
    },
    {
      menu_id: 'IC015',
      dishName: 'Raspberry Cheesecake',
      price: 180,
      quantity: 1,
      _id: new ObjectId('6a96cbb3932ae5b0ac5417ed'),
      itemTotal: 180
    }
  ],
  subtotal: 2050,
  tax: 102.5,
  grandTotal: 2152.5,
  createdAt: 2026-09-01T12:57:23.845Z,
  updatedAt: 2026-09-01T12:57:23.845Z,
  __v: 0
} equal 4 [ 'Aish', 'Alicia', 'Sara', 'Jane' ] [
  { menu_id: 'IC001', who_ordered: [ 'Aish', 'Sara' ] },
  { menu_id: 'IC002', who_ordered: [ 'Alicia', 'Jane' ] },
  { menu_id: 'IC003', who_ordered: [ 'Aish', 'Alicia', 'Jane' ] },
  { menu_id: 'IC005', who_ordered: [ 'Sara' ] },
  { menu_id: 'IC007', who_ordered: [ 'Aish', 'Jane' ] },
  { menu_id: 'IC008', who_ordered: [ 'Alicia' ] },
  { menu_id: 'IC012', who_ordered: [ 'Sara', 'Alicia' ] },
  {
    menu_id: 'IC015',
    who_ordered: [ 'Aish', 'Sara', 'Alicia', 'Jane' ]
  }
]
539
*/

/* Result stores

            [
                { name: 'Aish', amountOwed: 539 },
                { name: 'Alicia', amountOwed: 538 },
                { name: 'Sara', amountOwed: 538 },
                { name: 'Jane', amountOwed: 538 }
            ]
*/