import { createBrowserRouter } from 'react-router-dom'

import { GlobalLayout } from '@/pages/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { SignUp } from './pages/signUp/SignUp'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/sign-up',
          element: <SignUp />
        }
      ]
    }
  ],
)
