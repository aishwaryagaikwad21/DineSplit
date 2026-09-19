import React from 'react'
import { Menu, Utensils } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import GetStarted from './GetStarted'
import NavLinks from './NavLinks'

const Navbar = () => {
  
  const [menu, setMenu] = useState(false)


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
        <div className="flex items-center gap-10 max-sm:hidden">
          <NavLinks />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 max-sm:hidden">
          <GetStarted />
        </div>

        <div className='block relative sm:hidden'>
          <a href="#" onClick={() => setMenu((menu) => !menu)}>
            <Menu className='w-6 h-6' />
          </a>
          {menu && (
            <div className="flex flex-col gap-4 absolute right-0 top-full mt-2 w-64 rounded-xl border border-amber-100 bg-[#fffbf2] p-4 shadow-lg">
              <NavLinks />
            </div>
          )}
        </div>

      </div>
    </nav>


    </>
  )
}

export default Navbar