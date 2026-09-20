import React from 'react'
import { Link } from 'react-router-dom'

const GetStartedButton = () => {
  return (
        <Link
            to="/get-started"
            className="rounded-xl bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-500"
          >
            Get Started
          </Link>
  )
}

export default GetStartedButton