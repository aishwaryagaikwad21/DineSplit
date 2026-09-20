import React from 'react'

const Cards = () => {
  return (
    <>
        <div className='grid grid-cols-1 gap-8 my-5 sm:grid-cols-2 md:grid-cols-4  md:gap-2 max-w-8xl'>
            <div className='flex flex-col items-center'>
                <div className='w-15 h-15 bg-[#fbf3e1] rounded-full'>
                    <img src="/images/group.png" alt="group" className='w-12 h-12 pl-3 pt-2' />
                </div>
                <p className='font-bold'>Split with anyone</p>
                <p className='text-zinc-700 max-w-xs text-center'>Friends, family, or coworkers.</p>
            </div>

            <div className='flex flex-col items-center'>
                <div className='w-15 h-15 bg-[#fbf3e1] rounded-full'>
                    <img src="/images/flash.png" alt="group" className='w-11 h-11 pl-4 pt-3' />
                </div>
                <p className='font-bold'>Fast and simple</p>
                <p className='text-zinc-700 max-w-xs text-center'>Add items, split, and settle in seconds.</p>
            </div>

            <div className='flex flex-col items-center'>
                <div className='w-15 h-15 bg-[#fbf3e1] rounded-full'>
                    <img src="/images/security.png" alt="group" className='w-11 h-11 pl-4 pt-3' />
                </div>
                <p className='font-bold'>Stress-free</p>
                <p className='text-zinc-700 max-w-xs text-center'>No more awkward money conversations.</p>
            </div>

            <div className='flex flex-col items-center'>
                <div className='w-15 h-15 bg-[#fbf3e1] rounded-full'>
                    <img src="/images/heart.png" alt="group" className='w-11 h-11 pl-4 pt-4' />
                </div>
                <p className='font-bold'>More good times</p>
                <p className='text-zinc-700 max-w-xs text-center'>Less math, more memories.</p>
            </div>
        </div>
    </>
  )
}

export default Cards