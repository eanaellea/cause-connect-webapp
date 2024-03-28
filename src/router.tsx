import { createBrowserRouter } from 'react-router-dom'

import { GlobalLayout } from '@/pages/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { SignUp } from './pages/signUp/SignUp'
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
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/forgotten-password',
          element: <ForgottenPassword />
        }
      ]
    }
  ],
)
