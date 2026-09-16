import {
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import MainLayout from '@/layouts/MainLayout'

import Landing from '../pages/Landing'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Landing />} />
    </Route>
  )
)

export default router