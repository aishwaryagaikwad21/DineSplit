import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NavLinks = () => {
const location = useLocation() //gives you information about the current URL.
  return (
    <>
        {location.pathname !== '/' && (
            <Link to="/" className="text-sm font-medium text-zinc-800 transition-colors hover:text-amber-600">
              Home
            </Link>
          )}
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
    </>
  )
}

export default NavLinks