import React from 'react'
import { useState } from 'react'
import billData from '../sampleData-1.json'
import { X } from "lucide-react"
import { Button } from '@base-ui/react/button'

import BillDishes from '@/components/AIExtractedBill/BillDishes'
import AddNewDishForm from '@/components/AIExtractedBill/AddNewDishForm'
import AdditionalCharges from '@/components/AIExtractedBill/AdditionalCharges'
import AddNewChargeForm from '@/components/AIExtractedBill/AddNewChargeForm'

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
                <AddNewDishForm
                    newDish = {newDish} 
                    onChange = {handleNewDishChange}
                    onSubmit = {handleAddDish}
                    onCancel = {() => setAddFormTogg((prevTogg) => !prevTogg) }
                />
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
                    <AdditionalCharges 
                        bill = {bill}
                        chargeNames = {chargeNames}
                        onChange = {handleChargeNameTyping}
                        onBlur = {handleChargeNameChange}
                        onAmountChange = {handleChargeAmountChange}
                    />
                )}


                {addChargeFormTogg && (
                    <AddNewChargeForm 
                        newCharge = {newCharge}
                        onCancel = {() => setAddChargeFormTogg((prev) => !prev)}
                        onChange = {handleNewChargeChange}
                        onAddCharge = {handleAddCharge}
                    />
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