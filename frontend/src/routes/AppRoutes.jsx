import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'

import Landing from '../pages/Landing'
import Error from '@/pages/Error'
import GetStartedPage from '@/pages/GetStartedPage'
import CaptureBill from '@/pages/CaptureBill'
import ReviewBill from '@/pages/ReviewBill'
import TestPage from '@/pages/TestPage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Landing />} />
      <Route path='/get-started' element={<GetStartedPage />} />
      <Route path='capture-bill' element={<CaptureBill />}/>
      <Route path='/bill/review' element={<ReviewBill />} />
      <Route path='/test-page' element={<TestPage />} />
      <Route path='*' element={<Error />} />
    </Route>
  )
)

export default router