import React from 'react'

const AdditionalCharges = ({
    bill,
    chargeNames,
    onChange,
    onBlur,
    onAmountChange
}) => {
  return (
        <div className='my-3'>
            <h3 className='mb-2 font-semibold text-2xl'>Additional Charges</h3>
                        <div className='grid grid-cols-3'>
                            { Object.entries(bill.additionalCharges).map(([chargeName, amount], index) => (
                                <div key={chargeName} className='flex flex-col gap-1 '>
                                    <input 
                                        value={chargeNames[chargeName] ?? chargeName}  
                                        className='w-fit' 
                                        onChange={(e) => onChange(chargeName, e.target.value)} 
                                        onBlur={(e) => onBlur(chargeName, e.target.value)}/>
                                    
                                    <input 
                                        value={amount} 
                                        onChange={(e) => onAmountChange(chargeName, e.target.value)} />
                                </div>
                            )) }
                        </div>  
        </div>
  )
}

export default AdditionalCharges