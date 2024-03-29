import { Outlet } from 'react-router-dom'

import {
  HomeOutlined,
  FileTextOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import { createElement, FC, MouseEventHandler, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Layout, Menu, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import styles from './appLayout.module.scss'
import { router } from '@/router'
import { logoutAction } from '@/store/authSlice/actions'

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
    url: '/app',
    action: () => alert('clicked home')
  },
  {
    key: 'documents',
    icon: FileTextOutlined,
    label: 'Documents',
    url: '/app/documents'
  },
  {
    key: 'logout',
    icon: LogoutOutlined,
    label: 'Logout',
    action: () => { void logoutAction() }
  }
]

const items: MenuProps['items'] = menuItems.map((item) => ({
  ...item,
  icon: createElement(item.icon)
}))

export const AppLayout: FC = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false)

  const handleMouseEnter: MouseEventHandler = () => {
    setIsSliderOpen(true)
  }

  const handleMouseLeave: MouseEventHandler = () => {
    setIsSliderOpen(false)
  }

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

  const OPEN_SLIDER_WIDTH = 200
  const CLOSE_SLIDER_WIDTH = 70

  return (
    <Layout hasSider className={styles.appContainer}>
      <Sider
        className={styles.sider}
        theme='light'
        width={
          isSliderOpen ? OPEN_SLIDER_WIDTH : CLOSE_SLIDER_WIDTH
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='demo-logo-vertical' />
        <Menu mode='inline' defaultSelectedKeys={['home']} items={items} onClick={handleMenuItemClick} />
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
