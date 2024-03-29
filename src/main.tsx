import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'

import { router } from '@/router'
import '@/localization/i18n'

import './styles/global.css'

function init (): void {
  const root = document.getElementById('root')
  if (root != null) {
    ReactDOM.createRoot(root).render(
      <ConfigProvider
        theme={{
          algorithm: document.body.getAttribute('data-theme') === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
          cssVar: true
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    )
  }
}

init()
