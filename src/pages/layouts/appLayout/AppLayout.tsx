import { Outlet, useLocation } from 'react-router-dom'

import {
  HomeOutlined,
  FileTextOutlined,
  LogoutOutlined,
  SignatureOutlined,
  ScheduleOutlined,
  SettingOutlined,
  CheckSquareOutlined,
  RobotOutlined,
  CreditCardOutlined,
  EuroCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons'
import { createElement, FC } from 'react'
import { Layout, Menu, MenuProps } from 'antd'
import { Content } from 'antd/es/layout/layout'
import styles from './AppLayout.module.scss'
import { router } from '@/router'
import { logoutAction } from '@/store/authSlice/actions'
import { SideBar } from '@/components/sider/SideBar'
import { UserRole } from '@/services/mainApi/queries/auth'
import { useGlobalStore } from '@/store/store'

interface MenuItem {
  key: string
  icon: FC
  label: string
  url?: string | null
  rolesAllowed?: UserRole[]
  action?: (() => void) | null
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: HomeOutlined,
    label: 'Tableau de bord',
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
    key: 'surveys',
    icon: CheckSquareOutlined,
    label: 'Sondages',
    url: '/app/surveys'
  },
  {
    key: 'association-profile',
    icon: ScheduleOutlined,
    label: 'Association',
    url: '/app/association',
    rolesAllowed: [UserRole.ADMIN]
  },
  {
    key: 'chatbot',
    icon: RobotOutlined,
    label: 'Chatbot',
    url: '/app/chatbot'
  },
  {
    key: 'association-settings',
    icon: SettingOutlined,
    label: 'Paramètres',
    url: '/app/settings',
    rolesAllowed: [UserRole.ADMIN]
  },
  {
    key: 'calendar',
    icon: CalendarOutlined,
    label: 'Calendar',
    url: '/app/calendar'
  },
  {
    key: 'payments',
    icon: CreditCardOutlined,
    label: 'Paiements',
    url: '/app/payments',
    rolesAllowed: [UserRole.ADMIN]
  },
  {
    key: 'donations',
    icon: EuroCircleOutlined,
    label: 'Dons',
    url: '/app/donate'
  },
  {
    key: 'logout',
    icon: LogoutOutlined,
    label: 'Déconnexion',
    action: () => { void logoutAction() }
  }
]

export const AppLayout: FC = () => {
  const userRole = useGlobalStore((state) => state.user!.role) // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const items: MenuProps['items'] = menuItems
    .filter((item) => item.rolesAllowed == null || item.rolesAllowed.includes(userRole))
    .map((item) => ({
      key: item.key,
      label: item.label,
      icon: createElement(item.icon)
    }))

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
