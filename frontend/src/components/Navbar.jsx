import React from 'react'
import { Utensils } from 'lucide-react'
import GetStarted from './GetStarted'

const Navbar = () => {
  return (
    <>
      <nav className=" sticky top-0 z-50 w-full bg-[#fffbf2] ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400">
            <Utensils className="h-5 w-5 text-white" />
          </div>

          <span className="text-xl font-bold text-zinc-900">
            DineSplit
          </span>
        </div>

        {/* Navigation links */}
        <div className="flex items-center gap-10">
          <a
            href="#features"
            className="text-sm font-medium text-zinc-800 transition-colors hover:text-amber-600"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-zinc-800 transition-colors hover:text-amber-600"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-zinc-800 transition-colors hover:text-amber-600"
          >
            About
          </a>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <GetStarted />
        </div>

      </div>
    </nav>
    </>
  )
}

export default Navbar