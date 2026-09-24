import React from 'react'
import { X } from 'lucide-react'
import { Button } from '@base-ui/react/button'

const AddNewChargeForm = ({
    newCharge,
    onCancel,
    onChange,
    onAddCharge
}) => {
  return (
    <div className="mx-auto my-5 max-w-4xl rounded-xl border p-5">
    
                                <h2 className="flex justify-between mb-5 text-xl font-semibold">
                                    Add Additional Charge
                                    <X className='cursor-pointer' onClick={onCancel} />
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
                                                onChange(
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
                                                onChange(
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
                                        onClick={onAddCharge}
                                        className="cursor-pointer rounded-xl bg-amber-400 px-6 py-2 font-semibold text-zinc-900 hover:bg-amber-500"
                                    >
                                        Submit
                                    </Button>
    
                                </div>
    
                            </div>
  )
}

export default AddNewChargeForm