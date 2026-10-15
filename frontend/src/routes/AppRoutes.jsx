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
import EditScannedBill from '@/pages/EditScannedBill'
import SplitDetails from '@/pages/SplitDetails'
import Result from '@/pages/Result'
import ManualBill from '@/pages/ManualBill'
import Features from '@/pages/Features'
import About from '@/pages/AboutUs'
import HowItWorks from '@/pages/HowItWorks'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Landing />} />
      <Route path='/get-started' element={<GetStartedPage />} />
      <Route path='capture-bill' element={<CaptureBill />}/>
      <Route path='/bill/review' element={<ReviewBill />} />
      <Route path='/edit-scan' element={<EditScannedBill />} />
      <Route path='/split-details' element={<SplitDetails />} />
      <Route path='/split-result' element={<Result />}/>
      <Route path='/manual-bill' element={<ManualBill />} />
      <Route path='/features' element={<Features />} />
      <Route path='/about-us' element={<About />} />
      <Route path='/working' element={<HowItWorks />} />
      <Route path='*' element={<Error />} />
    </Route>
  )
)

export default router