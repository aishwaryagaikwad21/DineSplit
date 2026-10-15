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
          <Link
            to="/features"
            className="nav-link"
          >
            Features
          </Link>

          <Link
            to="/working"
            className="nav-link"
          >
            How It Works
          </Link>

          <Link
            to="/about-us"
            className="nav-link"
          >
            About
          </Link>
    </>
  )
}

export default NavLinks