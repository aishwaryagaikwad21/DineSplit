import React from 'react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#fffbf2] flex items-center justify-center px-6">
      
      <div className="flex flex-col items-center gap-6 text-center">

        <img
          src="/images/error-404.png"
          alt="Page not found"
          className="w-full max-w-sm"
        />

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold text-zinc-900">
            Looks like this table is empty.
          </h1>

          <p className="max-w-md text-lg text-zinc-600">
            We couldn't find the page you're looking for.
            Let's get you back to the good stuff.
          </p>
        </div>

      </div>

    </div>
  )
}

export default NotFound