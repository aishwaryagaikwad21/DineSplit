import React from 'react'
import { X } from "lucide-react"
import { Button } from '@base-ui/react/button'

const AddNewDishForm = ({
    newDish,
    onChange,
    onSubmit,
    onCancel
}) => {
  return (
        <div className="mx-auto my-5 max-w-4xl rounded-xl border p-5">

                    <h2 className="flex justify-between mb-5 text-xl font-semibold">
                        Add Dish 
                        <X className='cursor-pointer' onClick={onCancel} />
                    </h2>

                    <div className="grid gap-4 md:grid-cols-3">

                        {/* Dish Name */}
                        <div className="flex flex-col gap-1">
                            <label>Dish Name</label>

                            <input
                                type="text"
                                value={newDish.dishName}
                                onChange={(e) =>
                                    onChange(
                                        "dishName",
                                        e.target.value
                                    )
                                }
                                className="rounded-lg border px-3 py-2 outline-none focus:border-amber-400"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1">
                            <label>Price</label>

                            <input
                                type="number"
                                value={newDish.price}
                                onChange={(e) =>
                                    onChange(
                                        "price",
                                        e.target.value
                                    )
                                }
                                className="rounded-lg border px-3 py-2 outline-none focus:border-amber-400"
                                required
                            />
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col gap-1">
                            <label>Quantity</label>

                            <input
                                type="number"
                                min="1"
                                value={newDish.quantity}
                                onChange={(e) =>
                                    onChange(
                                        "quantity",
                                        e.target.value
                                    )
                                }
                                className="rounded-lg border px-3 py-2 outline-none focus:border-amber-400"
                                required
                            />
                        </div>

                    </div>

                <div className="mt-5 flex justify-center">
                    <Button
                        type="button"
                        onClick={onSubmit}
                        className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2 font-semibold text-zinc-900 hover:bg-amber-500"
                    >
                        Submit
                    </Button>
                </div>

            </div>
  )
}

export default AddNewDishForm