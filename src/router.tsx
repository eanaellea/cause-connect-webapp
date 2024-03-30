import { createBrowserRouter, redirect } from 'react-router-dom'

import { GlobalLayout } from '@/pages/layouts/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { Register } from './pages/register/Register'
import { ForgottenPassword } from './pages/forgottenPassword/ForgottenPassword'
import { LogIn } from './pages/logIn/LogIn'
import { useGlobalStore } from './store/store'
import { Dashboard } from './pages/dashboard/Dashboard'
import { ResetPassword } from './pages/resetPassword/ResetPassword'
import { PublicLayout } from './pages/layouts/publicLayout/PublicLayout'
import { AppLayout } from './pages/layouts/appLayout/AppLayout'
import { Documents } from './pages/documents/Documents'
import { useShareCodeAction } from './store/documentsSlice/actions'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <GlobalLayout />,
      children: [
        {
          path: '',
          element: <PublicLayout />,
          children: [
            {
              path: '',
              element: <Home />
            },
            {
              path: 'login',
              element: <LogIn />
            },
            {
              path: 'register',
              element: <Register />
            },
            {
              path: 'forgotten-password',
              element: <ForgottenPassword />
            },
            {
              path: 'reset-password',
              element: <ResetPassword />
            }
          ]
        },
        {
          path: '/app',
          loader: () => {
            if (useGlobalStore.getState().token === null) {
              return redirect('/login')
            }
            return null
          },
          element: <AppLayout />,
          children: [
            {
              path: '',
              element: <Dashboard />
            },
            {
              path: 'documents',
              element: <Documents />,
              children: [
                {
                  path: 'use-share-code/:shareCode',
                  loader: async ({ params }) => {
                    if (params.shareCode === undefined) {
                      return redirect('/app/documents')
                    }
                    await useShareCodeAction(params.shareCode)
                    return redirect('/app/documents')
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
)
