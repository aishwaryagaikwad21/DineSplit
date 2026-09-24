import React from 'react'

const BillDishes = ({dishes, onDishChange}) => {
  return (
    <div>
            <h3 className="mt-2 text-2xl font-semibold">
                Dishes
            </h3>

            {dishes.map((dish, index) => (
                <div
                    key={index}
                    className="mt-5 mb-5 flex gap-9 max-md:flex-col max-md:gap-1"
                >

                    <div className="flex flex-col gap-1">
                        <label>Dish Name</label>

                        <input
                            type="text"
                            value={dish.dishName}
                            onChange={(e) =>
                                onDishChange(
                                    index,
                                    "dishName",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Price</label>

                        <input
                            value={dish.price}
                            onChange={(e) =>
                                onDishChange(
                                    index,
                                    "price",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Quantity</label>

                        <input
                            value={dish.quantity}
                            onChange={(e) =>
                                onDishChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                )
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Item Total</label>

                        <input
                            value={dish.itemTotal}
                            readOnly
                            disabled
                        />
                    </div>

                </div>
            ))}
        </div>
  )
}

export default BillDishes