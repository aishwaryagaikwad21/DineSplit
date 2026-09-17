import React from 'react'
import GetStarted from './GetStarted'
import Working from './Working'

const Hero = () => {
  return (
    <div className="bg-[#fffbf2]">
        <div className='flex flex-col gap-10 mx-auto max-w-7xl  px-6 py-10 md:flex-row md:items-center md:gap-8'>

            {/* Left side text content */}
            <div className='flex-1 min-w-0'>
                <div className='flex flex-col gap-y-5'>
                    <p>GOOD FOOD. FAIR SHARES</p>

                    <h1 className="text-5xl font-bold tracking-tight text-zinc-900 md:text-6xl">
                         Enjoy the meal. <span className='text-amber-400'>Skip the math.</span>
                    </h1>

                    <p className='max-w-xl text-lg leading-relaxed'>
                        DineSplit makes it easy to split restaurant bills with friends,
                        so you can focus on what really matters - great food and better
                        company.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        <GetStarted />
                        <Working />
                    </div>

                    <div className='flex flex-wrap gap-x-8 gap-y-4'>
                        <div className='flex items-center gap-x-1'>
                            <img src="/images/check.png" alt="check" className="h-5 w-5"/>
                            <p>Free to use</p>
                        </div>
                        <div className='flex items-center gap-x-1'>
                            <img src="/images/check.png" alt="check" className="h-5 w-5"/>
                            <p>No awkward math</p>
                        </div>
                        <div className='flex items-center gap-x-1'>
                            <img src="/images/check.png" alt="check" className="h-5 w-5"/>
                            <p>Built for real life</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side image */}
            <div className='hidden sm:block sm:w-1/2'>
                <img src="/images/hero.png" alt="Good food tastes better together"  className="w-full" />
            </div>

        </div>

    </div>
  )
}

export default Hero