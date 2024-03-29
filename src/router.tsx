import { createBrowserRouter, redirect } from 'react-router-dom'

import { GlobalLayout } from '@/pages/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { SignUp } from './pages/signUp/SignUp'
import { ForgottenPassword } from './pages/forgottenPassword/ForgottenPassword'
import { LogIn } from './pages/logIn/LogIn'
import { PublicLayout } from './pages/publicLayout/PublicLayout'

export const router = createBrowserRouter(
  [
    {
      path: '/app',
      element: <GlobalLayout />,
      loader: () => {
        // TODO: implement auth check
        if (localStorage.getItem('token') === null) {
          return redirect('/')
        }
        return null
      },
      children: [
        {
          path: '/app',
          element: <Home />
        }
      ],
    },
    {
      path: '/',
      element: <PublicLayout />,
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
