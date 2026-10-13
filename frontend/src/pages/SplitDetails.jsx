import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const SplitDetails = () => {
    const location = useLocation()

    const billData = location.state?.confirmBill

    const [bill, setBill] = useState(billData ?? null)

    console.log(bill)

    if (!bill) {
        return (
            <div className="min-h-screen bg-[#fffbf2] p-8">
                <h1 className="text-2xl font-bold text-zinc-900">
                    Bill details unavailable
                </h1>

                <p className="mt-2 text-zinc-600">
                    Please confirm a bill before proceeding.
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#fffbf2] p-8">
            <h1 className="text-3xl font-bold text-zinc-900">
                Let's Split This Meal
            </h1>

            <p className="mt-2 text-zinc-600">
                Bill Code: {bill.billCode}
            </p>

            <p className="mt-2 text-zinc-600">
                Grand Total: ₹{bill.bill.grandTotal}
            </p>

            {/* Build your split form here */}
        </div>
    )
}

export default SplitDetails