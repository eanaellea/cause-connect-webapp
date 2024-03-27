import { createBrowserRouter } from 'react-router-dom'

import { GlobalLayout } from '@/pages/globalLayout/GlobalLayout'
import { Home } from './pages/home/Home'
import { CreateAssociation } from './pages/createAssociation/CreateAssociation'

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
          path: '/create-association',
          element: <CreateAssociation />
        }
      ]
    }
  ],
)
