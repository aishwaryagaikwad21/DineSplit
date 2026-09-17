import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'


const MainLayout = () => {
  return (
    <div className='mx-8'>
        <Navbar />
        <Outlet />
    </div>
  )
}

export default MainLayout