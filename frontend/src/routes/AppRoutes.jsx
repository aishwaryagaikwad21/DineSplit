import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'

import Landing from '../pages/Landing'
import Error from '@/pages/Error'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Landing />} />
      <Route path='*' element={<Error />} />
    </Route>
  )
)

export default router