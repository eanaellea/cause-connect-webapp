import { Outlet, useLocation } from 'react-router-dom'

import {
  HomeOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SignatureOutlined
} from '@ant-design/icons'
import { createElement, FC } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import styles from './appLayout.module.scss'
import { router } from '@/router'
import { logoutAction } from '@/store/authSlice/actions'
import { SideBar } from '@/components/sider/SideBar'

interface MenuItem {
  key: string
  icon: FC
  label: string
  url?: string | null
  action?: (() => void) | null
}

const menuItems: MenuItem[] = [
  {
    key: 'home',
    icon: HomeOutlined,
    label: 'Home',
    url: '/app'
  },
  {
    key: 'documents',
    icon: FileTextOutlined,
    label: 'Documents',
    url: '/app/documents'
  },
  {
    key: 'votes',
    icon: SignatureOutlined,
    label: 'Votes',
    url: '/app/votes'
  },
  {
    key: 'logout',
    icon: LogoutOutlined,
    label: 'Logout',
    action: () => { void logoutAction() }
  }
]

const items: MenuProps['items'] = menuItems.map((item) => ({
  key: item.key,
  label: item.label,
  icon: createElement(item.icon)
}))

export const AppLayout: FC = () => {
  const { pathname } = useLocation()

  const selectedMenuKey = menuItems.find((item) => item.url === pathname)?.key

  const handleMenuItemClick: MenuProps['onClick'] = ({ key }) => {
    const item = menuItems.find((item) => item?.key === key)
    if (item === null || item === undefined) {
      console.error('Menu item not found')
      return
    }

    if (item.action != null) {
      item.action()
    }

    if (item.url != null) {
      void router.navigate(item.url)
    }
  }

  return (
    <Layout hasSider className={styles.appContainer}>
      <SideBar>
        <div className='demo-logo-vertical' />
        <Menu mode='inline' defaultSelectedKeys={[selectedMenuKey ?? '']} items={items} onClick={handleMenuItemClick} />
      </SideBar>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
