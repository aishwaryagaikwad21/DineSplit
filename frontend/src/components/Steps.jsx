import React from 'react'

const Steps = () => {
  return (
    <>
    <section className="px-6 py-16">
        <div className='flex flex-col gap-5 my-7 items-center'>
            <p className='bg-[#fbf3e1] px-4 py-2 rounded-full'>HOW IT WORKS</p>
            <h2 className='text-2xl font-semibold md:text-3xl'>From bill to balance in 3 steps</h2>
            <div className='grid grid-cols-1 gap-20 sm:grid-cols-3'>
                <div className='flex flex-col gap-1 items-center'>
                    <div className='flex mb-3'>
                        <p className='size-7 bg-[#fbe7b8] rounded-full mt-10'><span className='ml-2.5 font-semibold '>1</span></p>
                        <div className='size-17 bg-[#fbf3e1] rounded-full'>
                            <img src="/images/bill.png" alt="bill" className='size-9 m-4'/>
                        </div>
                    </div>
                    <p className='font-semibold'>Add the bill</p>
                    <p className="max-w-xs text-center text-zinc-600">Scan the bill if the restaurant isn't found, or scan the QR code to get the bill.</p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='flex mb-3'>
                        <p className='size-7 bg-[#fbe7b8] rounded-full mt-10'><span className='ml-2.5 font-semibold'>2</span></p>
                        <div className='size-17 bg-[#fbf3e1] rounded-full'>
                            <img src="/images/group.png" alt="group" className='size-9 m-4'/>
                        </div>
                    </div>
                    <p>Split your way</p>
                    <p className="max-w-xs text-center text-zinc-600">Split equally or customise split based on who ordered what. </p>
                </div>

                <div className='flex flex-col items-center'>
                    <div className='flex mb-3'>
                        <p className='size-7 bg-[#fbe7b8] rounded-full mt-10'><span className='ml-2.5 font-semibold'>3</span></p>
                        <div className='size-17 bg-[#fbf3e1] rounded-full'>
                            <img src="/images/credit-card.png" alt="debit-card" className='size-9 m-4'/>
                        </div>
                    </div>
                    <p>Settle up</p>
                    <p className="max-w-xs text-center text-zinc-600">See who owes what and settle right in the app.</p>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Steps