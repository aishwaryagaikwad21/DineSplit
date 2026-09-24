import React from 'react'

const Discount = ({
    bill,
    onDiscountChange
}) => {
  return (
                    <div className='my-3'>
                        <h3 className='mb-2 font-semibold text-2xl'>Discount</h3>
                        <div className='flex gap-1'>
                            { Object.entries(bill.discount).map(([discountPercent, discountAmount]) => (
                                <div key={discountPercent} className='flex flex-col gap-1 '>
                                    <input value={discountPercent} onChange={(e) =>
                                            onDiscountChange("percent", e.target.value)
                                        } className='w-fit'/>
                                    <input value={discountAmount} onChange={(e) =>
                                            onDiscountChange("amount", e.target.value)
                                        } />
                                </div>
                            )) }
                        </div>
                    </div>
  )
}

export default Discount