import { createBrowserRouter } from 'react-router-dom'

import { GlobalLayout } from '@/pages/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { Register } from './pages/register/Register'
import { ForgottenPassword } from './pages/forgottenPassword/ForgottenPassword'
import { LogIn } from './pages/logIn/LogIn'

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
          path: '/login',
          element: <LogIn />
        },
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/forgotten-password',
          element: <ForgottenPassword />
        }
      ]
    }
  ],
)
