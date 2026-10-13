import React from 'react'

const Hero = () => {
  return (
    <>
            <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 sm:grid-cols-[1fr_auto] sm:gap-8">

                {/* Hero text */}
                <div className="min-w-0 max-sm:text-center">
                    <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-amber-600 md:text-xl">
                        SPLIT YOUR BILL
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-6xl">
                        Let's split this meal
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
                        Add everyone at the table, choose how to split, and tell us who ordered what.
                    </p>
                </div>

                {/* Hero illustration */}
                <div className=" hidden mx-auto w-36 h-auto shrink-0 sm:w-40 md:w-48 lg:w-102 sm:block">
                    <img
                        src="/images/split-page-hero.svg"
                        alt="Plate with fork and knife"
                        className="block h-auto w-full object-contain"
                    />
                </div>

            </div>
    </>
  )
}

export default Hero