import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NavLinks = () => {
const location = useLocation() //gives you information about the current URL.
  return (
    <>
        {location.pathname !== '/' && (
            <Link to="/" className="nav-link">
              Home
            </Link>
          )}
          <a
            href="#features"
            className="nav-link"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="nav-link"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="nav-link"
          >
            About
          </a>
    </>
  )
}

export default NavLinks