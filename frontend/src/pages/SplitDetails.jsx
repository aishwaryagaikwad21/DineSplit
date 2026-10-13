import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import Hero from '@/components/Split-Details/Hero'


const SplitDetails = () => {
    const location = useLocation()

    const confirmedBill = location.state?.confirmBill

    const [bill, setBill] = useState(confirmedBill?.bill ?? null)

    console.log(bill)

    const [memNames, setMemNames] = useState([])
    const [memberNameInput, setMemberNameInput] = useState("")
    const [splitType, setSplitType] = useState("equal")
    const [dishDetails, setDishDetails] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Confirmed dishes from the backend
    const dishes = bill?.dishes ?? []

    // Add a member
    const handleAddMember = (e) => {
        e.preventDefault()

        const name = memberNameInput.trim()

        if (!name) {
            setError("Please enter a member name.")
            return
        }

        const alreadyExists = memNames.some(
            member => member.toLowerCase() === name.toLowerCase()
        )

        if (alreadyExists) {
            setError("This member has already been added.")
            return
        }

        setMemNames(prev => [...prev, name])
        setMemberNameInput("")
        setError("")
    }

    // Remove a member and their assignments from every dish
    const handleRemoveMember = (nameToRemove) => {
        setMemNames(prev =>
            prev.filter(name => name !== nameToRemove)
        )

        setDishDetails(prev =>
            prev.map(dish => ({
                ...dish,
                who_ordered: dish.who_ordered.filter(
                    name => name !== nameToRemove
                )
            }))
        )

        setError("")
    }

    // Switch splitting method
    const handleSplitTypeChange = (type) => {
        setSplitType(type)
        setError("")
    }

    // Toggle a member's assignment to a dish
    const handleDishAssignment = (dish, memberName, checked) => {
        setDishDetails(prev => {
            const existingDish = prev.find(
                item => item.dishId === dish._id
            )

            const currentMembers = existingDish
                ? existingDish.who_ordered
                : []

            const updatedMembers = checked
                ? [...currentMembers, memberName]
                : currentMembers.filter(
                    name => name !== memberName
                )

            const updatedDish = {
                dishId: dish._id,
                dishname: dish.dishName,
                who_ordered: updatedMembers
            }

            if (existingDish) {
                return prev.map(item =>
                    item.dishId === dish._id
                        ? updatedDish
                        : item
                )
            }

            return [...prev, updatedDish]
        })

        setError("")
    }

    // Check whether a member is assigned to a dish
    const isMemberAssigned = (dishId, memberName) => {
        const dish = dishDetails.find(
            item => item.dishId === dishId
        )

        return dish?.who_ordered.includes(memberName) ?? false
    }

    // Submit the split configuration
    const handleCalculateSplit = async (e) => {
        e.preventDefault()

        if (memNames.length < 2) {
            setError("At least 2 people are required to split a bill.")
            return
        }

        if (splitType === "item-wise") {
            const incompleteDish = dishes.some(dish => {
                const assignment = dishDetails.find(
                    item => item.dishId === dish._id
                )

                return !assignment?.who_ordered.length
            })

            if (incompleteDish) {
                setError(
                    "Please assign at least one member to every dish."
                )
                return
            }
        }

        const splitData = {
            totalMembers: memNames.length,
            splitType,
            memNames,
            ...(splitType === "item-wise" && {
                dishDetails: dishes.map(dish => {
                    const assignment = dishDetails.find(
                        item => item.dishId === dish._id
                    )

                    return {
                        dishId: dish._id,
                        dishname: dish.dishName,
                        who_ordered: assignment?.who_ordered ?? []
                    }
                })
            })
        }

        try {
            setLoading(true)
            setError("")

            const response = await fetch(
                `http://localhost:5000/split-details/${bill._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(splitData)
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to calculate split."
                )
            }

            console.log("Split response:", data)

            // Replace this with your actual result route
            // once the backend response and result page are ready.
        } catch (err) {
            console.error("SPLIT ERROR:", err)
            setError(err.message || "Something went wrong.")
        } finally {
            setLoading(false)
        }
    }

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
      <>
      <div className="bg-[#FFFBF2] px-6 py-3 sm:px-4 lg:py-5">
        <Hero />

        <form
                onSubmit={handleCalculateSplit}
                className="mx-auto max-w-6xl space-y-5"
            >

                {/* STEP 1: Members */}
                <section className="rounded-2xl border border-[#F3E8D0] bg-white/50 p-5 sm:p-6">
                    <div className="mb-6 flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-zinc-900">
                            1
                        </span>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                                Who's splitting?
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500">
                                Add each person's name. The number of people
                                will update automatically.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-8">

                        {/* Automatic member count */}
                        <div>
                            <label
                                htmlFor="totalMembers"
                                className="mb-2 block text-sm font-semibold text-zinc-900"
                            >
                                Number of people
                            </label>

                            <input
                                id="totalMembers"
                                type="number"
                                value={memNames.length}
                                readOnly
                                className="w-full rounded-xl border border-[#F3E8D0] bg-[#FFF7E6] px-4 py-3 text-zinc-900 outline-none"
                            />
                        </div>

                        {/* Add member */}
                        <div>
                            <label
                                htmlFor="memberName"
                                className="mb-2 block text-sm font-semibold text-zinc-900"
                            >
                                Add member name
                            </label>

                            <div className="flex gap-3">
                                <input
                                    id="memberName"
                                    type="text"
                                    value={memberNameInput}
                                    onChange={e =>
                                        setMemberNameInput(e.target.value)
                                    }
                                    placeholder="Enter name (e.g. Alex)"
                                    className="min-w-0 flex-1 rounded-xl border border-[#F3E8D0] bg-white px-4 py-3 text-sm outline-none focus:border-amber-500"
                                />

                                <button
                                    type="button"
                                    onClick={handleAddMember}
                                    disabled={!memberNameInput.trim()}
                                    className="shrink-0 rounded-xl bg-amber-400 px-4 py-3 font-semibold text-zinc-900 transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Member boxes */}
                    <div className="mt-6">
                        <h3 className="mb-3 text-sm font-semibold text-zinc-900">
                            Members ({memNames.length})
                        </h3>

                        {memNames.length === 0 ? (
                            <div className="rounded-xl bg-[#FFF7E6] px-4 py-8 text-center text-sm text-zinc-500">
                                No members added yet. Add names using the
                                input above.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {memNames.map(name => (
                                    <div
                                        key={name}
                                        className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[#F3E8D0] bg-[#FFF7E6]/60 px-4 py-3"
                                    >
                                        <span className="truncate text-sm font-medium text-zinc-900">
                                            <span className="mr-2 text-[#A05703]">
                                                ♙
                                            </span>
                                            {name}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveMember(name)
                                            }
                                            aria-label={`Remove ${name}`}
                                            className="shrink-0 text-lg text-zinc-500 hover:text-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* STEP 2: Split type */}
                <section className="rounded-2xl border border-[#F3E8D0] bg-white/50 p-5 sm:p-6">
                    <div className="mb-6 flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-zinc-900">
                            2
                        </span>

                        <div>
                            <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                                How do you want to split?
                            </h2>
                            <p className="mt-1 text-sm text-zinc-500">
                                Choose the splitting method.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Equal split */}
                        <button
                            type="button"
                            onClick={() =>
                                handleSplitTypeChange("equal")
                            }
                            aria-pressed={splitType === "equal"}
                            className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                                splitType === "equal"
                                    ? "border-amber-500 bg-[#FFF7E6]"
                                    : "border-[#F3E8D0] hover:border-amber-300"
                            }`}
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-900">
                                    Split equally
                                </h3>
                                <p className="mt-2 text-sm text-zinc-500">
                                    Everyone pays an equal share of the
                                    total amount.
                                </p>
                            </div>

                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                splitType === "equal"
                                    ? "border-amber-500 bg-amber-400"
                                    : "border-zinc-300"
                            }`}>
                                {splitType === "equal" && (
                                    <span className="h-2 w-2 rounded-full bg-zinc-900" />
                                )}
                            </span>
                        </button>

                        {/* Item-wise split */}
                        <button
                            type="button"
                            onClick={() =>
                                handleSplitTypeChange("item-wise")
                            }
                            aria-pressed={splitType === "item-wise"}
                            className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                                splitType === "item-wise"
                                    ? "border-amber-500 bg-[#FFF7E6]"
                                    : "border-[#F3E8D0] hover:border-amber-300"
                            }`}
                        >
                            <div>
                                <h3 className="font-semibold text-zinc-900">
                                    Split by items
                                </h3>
                                <p className="mt-2 text-sm text-zinc-500">
                                    Choose who ordered each dish and split
                                    accordingly.
                                </p>
                            </div>

                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                splitType === "item-wise"
                                    ? "border-amber-500 bg-amber-400"
                                    : "border-zinc-300"
                            }`}>
                                {splitType === "item-wise" && (
                                    <span className="h-2 w-2 rounded-full bg-zinc-900" />
                                )}
                            </span>
                        </button>
                    </div>
                </section>

                {/* STEP 3: Only show for item-wise */}
                {splitType === "item-wise" && (
                    <section className="rounded-2xl border border-[#F3E8D0] bg-white/50 p-5 sm:p-6">
                        <div className="mb-6 flex items-start gap-4">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-lg font-bold text-zinc-900">
                                3
                            </span>

                            <div>
                                <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl">
                                    Who ordered what?
                                </h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    Select the people who ordered or shared
                                    each dish.
                                </p>
                            </div>
                        </div>

                        {memNames.length === 0 ? (
                            <p className="rounded-xl bg-[#FFF7E6] p-4 text-sm text-zinc-600">
                                Add members above before assigning dishes.
                            </p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[640px] text-left">
                                    <thead>
                                        <tr className="bg-[#FFF7E6] text-xs text-zinc-600">
                                            <th className="rounded-l-lg px-3 py-3 font-medium">
                                                Dish
                                            </th>
                                            <th className="px-3 py-3 font-medium">
                                                Price
                                            </th>
                                            <th className="px-3 py-3 font-medium">
                                                Quantity
                                            </th>
                                            <th className="rounded-r-lg px-3 py-3 font-medium">
                                                Who ordered / shared it?
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {dishes.map(dish => (
                                            <tr
                                                key={dish._id}
                                                className="border-b border-[#F3E8D0]"
                                            >
                                                <td className="px-3 py-4 text-sm font-medium text-zinc-900">
                                                    {dish.dishName}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-zinc-600">
                                                    ₹{dish.price}
                                                </td>

                                                <td className="px-3 py-4 text-sm text-zinc-600">
                                                    {dish.quantity}
                                                </td>

                                                <td className="px-3 py-4">
                                                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                                                        {memNames.map(
                                                            member => (
                                                                <label
                                                                    key={member}
                                                                    className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700"
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isMemberAssigned(
                                                                            dish._id,
                                                                            member
                                                                        )}
                                                                        onChange={e =>
                                                                            handleDishAssignment(
                                                                                dish,
                                                                                member,
                                                                                e.target.checked
                                                                            )
                                                                        }
                                                                        className="h-4 w-4 accent-amber-500"
                                                                    />

                                                                    {member}
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                )}

                {/* Validation message */}
                {error && (
                    <p
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between gap-4 pb-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-full border border-amber-400 px-6 py-3 font-semibold text-zinc-900 transition hover:bg-[#FFF7E6]"
                    >
                        ← Back
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-zinc-900 transition hover:bg-amber-500 disabled:cursor-wait disabled:opacity-60"
                    >
                        {loading ? "Calculating..." : "Calculate Split →"}
                    </button>
                </div>
            </form>

      </div>

      </>
    )
}

export default SplitDetails