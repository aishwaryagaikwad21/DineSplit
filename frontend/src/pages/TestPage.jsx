import React from 'react'
import { useState } from 'react'
import billData from '../sampleData-1.json'
import { Button } from '@base-ui/react/button'
import { X } from "lucide-react"
import BillDishes from '@/components/AIExtractedBill/BillDishes'

const TestPage = () => {

    const [bill, setBill] = useState(billData)
    const [chargeNames, setChargeNames] = useState({})
    const [addFormTogg, setAddFormTogg] = useState(false)
    const [newDish, setNewDish] = useState({
        dishName: "",
        price: "",
        quantity: ""
    })

    const handleDishChange = (index, field, value) => {
        setBill((prevBill) => {

            const updatedDishes = prevBill.dishes.map((dish, i) => {

                if (i !== index) {
                    return dish
                }

                const updatedDish = {
                    ...dish,
                    [field]: value
                }

                if (field === "price" || field === "quantity") {
                    updatedDish.itemTotal =
                        updatedDish.price === "" || updatedDish.quantity === ""
                            ? ""
                            : Number(updatedDish.price) *
                            Number(updatedDish.quantity)
                }

                return updatedDish
            })

            const updatedSubtotal = updatedDishes.reduce(
                (total, dish) => total + Number(dish.itemTotal || 0),
                0
            )

            return {
                ...prevBill,
                dishes: updatedDishes,
                subtotal: updatedSubtotal
            }
        })
    }

    //handle Charge amount change
    const handleChargeAmountChange = (chargeName, value) => {

        setBill((prevBill) => {
            const updatedCharges = {
                ...prevBill.additionalCharges,
                [chargeName]: value
            }

            const additionalChargesTotal = Object.values(updatedCharges)
                .reduce((total, amount) => total + Number(amount || 0), 0)
            
            const grandTotal = Number(prevBill.subtotal) + additionalChargesTotal - Number(prevBill.discount?.amount || 0)
            
            return{
                ...prevBill,
                additionalCharges: updatedCharges,
                grandTotal: grandTotal
            }
        
        })
    }

    //Charge name typing
     const handleChargeNameTyping = (oldName, value) => {

        setChargeNames((prev) => ({
            ...prev,
            [oldName]: value
        }))
    }

    //update the charge name object
    const handleChargeNameChange = (oldName, newName) => {

        setBill((prevBill) => {

            const updatedCharges = {
                ...prevBill.additionalCharges
            }

            const amount = updatedCharges[oldName]

            delete updatedCharges[oldName]

            updatedCharges[newName] = amount

            return {
                ...prevBill,
                additionalCharges: updatedCharges
            }
        })


        // Remove temporary value
        setChargeNames((prev) => {

            const updatedNames = {
                ...prev
            }

            delete updatedNames[oldName]

            return updatedNames
        })
    }

    const handleNewDishChange = (field, value) => {
        setNewDish((prevDish) => ({
            ...prevDish,
            [field]: value
        }))
    }

    const handleAddDish = () => {

        const itemTotal = newDish.price * newDish.quantity
        const dishToAdd = {
            dishName: newDish.dishName,
            price: newDish.price,
            quantity: newDish.quantity,
            itemTotal
        }


        setBill((prevBill) => {
            const newDishes = [
                ...prevBill.dishes,
                dishToAdd
            ]
            const newSubTotal = newDishes.reduce((total, dish) => (
                total + Number(dish.itemTotal || 0)
            ), 0)

            const additionalChargesTotal = Object.values(prevBill.additionalCharges).reduce((total, amount) => total + Number(amount || 0),0)
        
            const grandTotal = newSubTotal + additionalChargesTotal - Number(prevBill.discount?.amount || 0)

            return{
               ...prevBill,
               dishes: [
                    ...prevBill.dishes,
                    dishToAdd
                ],
                subtotal: newSubTotal,
                grandTotal
            }
        })

        setNewDish({
            dishName: "",
            price: "",
            quantity: ""
        })

        setAddFormTogg(false)
    }

    const [addChargeFormTogg, setAddChargeFormTogg] = useState(false)

    const [newCharge, setNewCharge] = useState({
        name: "",
        amount: ""
    })

    const handleNewChargeChange = (field, value) => {
        setNewCharge((prevCharge) => ({
            ...prevCharge,
            [field]: value
        }))
    }

    const handleAddCharge = (e) => {
        e.preventDefault()

        setBill((prevBill) => {

            const newCharges = {
                ...prevBill.additionalCharges,
                [newCharge.name]: newCharge.amount
            }

            const additionalChargesTotal = Object.values(
                newCharges
            ).reduce(
                (total, amount) =>
                    total + Number(amount || 0),
                0
            )

            const grandTotal =
                Number(prevBill.subtotal) +
                additionalChargesTotal -
                Number(prevBill.discount?.amount || 0)

            return {
                ...prevBill,
                additionalCharges: newCharges,
                grandTotal
            }
        })

        setNewCharge({
            name: "",
            amount: ""
        })

        setAddChargeFormTogg(false)
    }

    //Discount change
    const handleDiscountChange = (field, value) => {

    setBill((prevBill) => {

        const updatedDiscount = {
            ...prevBill.discount,
            [field]: value
        }

        const additionalChargesTotal = Object.values(
            prevBill.additionalCharges
        ).reduce(
            (total, amount) => total + Number(amount || 0),
            0
        )

        const grandTotal =
            Number(prevBill.subtotal) +
            additionalChargesTotal -
            Number(updatedDiscount.amount || 0)

        return {
            ...prevBill,
            discount: updatedDiscount,
            grandTotal
        }
    })
}

    return (
        
        <>
        
        <div className='flex justify-center max-md:flex-col max-md:align-middle'>
           <form>
           <h3 className='font-semibold text-2xl mt-2'>Dishes</h3>
            <BillDishes
                dishes={bill.dishes}
                onDishChange={handleDishChange}
            />

            {addFormTogg && (
                <div className="mx-auto my-5 max-w-4xl rounded-xl border p-5">
                    

                    <h2 className="flex justify-between mb-5 text-xl font-semibold">
                        Add Dish 
                        <X className='cursor-pointer' onClick={() => setAddFormTogg((prevTogg) => !prevTogg) } />
                    </h2>

                    <div className="grid gap-4 md:grid-cols-3">

                        {/* Dish Name */}
                        <div className="flex flex-col gap-1">
                            <label>Dish Name</label>

                            <input
                                type="text"
                                value={newDish.dishName}
                                onChange={(e) =>
                                    handleNewDishChange(
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
                                    handleNewDishChange(
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
                                    handleNewDishChange(
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
                        onClick={handleAddDish}
                        className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2 font-semibold text-zinc-900 hover:bg-amber-500"
                    >
                        Submit
                    </Button>
                </div>

            </div>
        )}

            <div className='flex justify-center my-2'>
               <Button type="button" className="cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-500"
                    onClick={() => setAddFormTogg((prevTogg) => !prevTogg)}>
                    + Add Dish
                </Button>
            </div>

            <div className='flex gap-3'>
                <h3 className='font-semibold text-2xl'>Sub Total</h3>
                <input value={bill.subtotal} className='font-medium text-xl' readOnly disabled/>
            </div>

                {bill.additionalCharges && (
                    <>
                     <div className='my-3'>
                        <h3 className='mb-2 font-semibold text-2xl'>Additional Charges</h3>
                        <div className='grid grid-cols-3'>
                            { Object.entries(bill.additionalCharges).map(([chargeName, amount], index) => (
                                <div key={chargeName} className='flex flex-col gap-1 '>
                                    <input 
                                        value={chargeNames[chargeName] ?? chargeName}  
                                        className='w-fit' 
                                        onChange={(e) => handleChargeNameTyping(chargeName, e.target.value)} 
                                        onBlur={(e) => handleChargeNameChange(chargeName, e.target.value)}/>
                                    
                                    <input 
                                        value={amount} 
                                        onChange={(e) => handleChargeAmountChange(chargeName, e.target.value)} />
                                </div>
                        )) }
                        </div>
                    </div>
                    </>
                )}


                {addChargeFormTogg && (
                        <div className="mx-auto my-5 max-w-4xl rounded-xl border p-5">

                            <h2 className="flex justify-between mb-5 text-xl font-semibold">
                                Add Additional Charge
                                <X className='cursor-pointer' onClick={() =>
                                    setAddChargeFormTogg((prev) => !prev)
                                } />
                            </h2>

                            <div className="grid gap-4 md:grid-cols-2">

                                {/* Charge Name */}
                                <div className="flex flex-col gap-1">

                                    <label>
                                        Charge Name
                                    </label>

                                    <input
                                        type="text"
                                        value={newCharge.name}
                                        onChange={(e) =>
                                            handleNewChargeChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. Service Charge"
                                        required
                                    />

                                </div>


                                {/* Charge Amount */}
                                <div className="flex flex-col gap-1">

                                    <label>
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={newCharge.amount}
                                        onChange={(e) =>
                                            handleNewChargeChange(
                                                "amount",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 50"
                                        required
                                    />

                                </div>

                            </div>


                            <div className="mt-5">

                                <Button
                                    type="button"
                                    onClick={handleAddCharge}
                                    className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2 font-semibold text-zinc-900 hover:bg-amber-500"
                                >
                                    Submit
                                </Button>

                            </div>

                        </div>
                )}

                <div className='flex justify-center'>
                    <Button
                        type="button"
                        className=" cursor-pointer rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-900 hover:bg-amber-500"
                        onClick={() =>
                            setAddChargeFormTogg((prev) => !prev)
                        }
                    >
                        + Add Charge
                    </Button>
                </div>

            {bill.discount.amount !== 0 && (
                <>
                    <div className='my-3'>
                        <h3 className='mb-2 font-semibold text-2xl'>Discount</h3>
                        <div className='flex gap-1'>
                            { Object.entries(bill.discount).map(([discountPercent, discountAmount]) => (
                                <div key={discountPercent} className='flex flex-col gap-1 '>
                                    <input value={discountPercent} onChange={(e) =>
                                            handleDiscountChange("percent", e.target.value)
                                        } className='w-fit'/>
                                    <input value={discountAmount} onChange={(e) =>
                                            handleDiscountChange("amount", e.target.value)
                                        } />
                                </div>
                            )) }
                        </div>
                    </div>
                </>
            )}

            <div className='flex gap-2 my-3'>
                <h3 className='font-semibold text-2xl'>Grand Total</h3>
                <input value={bill.grandTotal} className='font-medium text-xl'/>
            </div>

            <div className='flex justify-center'>
               <button className="cursor-pointer w-1/2 rounded-xl bg-amber-400 px-6 py-2 my-6 font-semibold text-zinc-900 hover:bg-amber-500">CONFIRM BILL</button>
            </div>
           </form>
        </div>
    </>
    )
}

export default TestPage