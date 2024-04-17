import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useGlobalStore } from '@/store/store'
import { setActivePage } from '@/store/layoutSlice/actions'

import styles from './Header.module.scss'
import { MenuItem } from '@/types.d.tsx'
import { FC } from 'react'

const items: MenuItem[] = [
  {
    label: (
      <a href='/' target='_self'>
        Accueil
      </a>
    ),
    key: 'home'
  },
  {
    label: (
      <a href='/#features' target='_self'>
        Features
      </a>
    ),
    key: 'features'
  },
  {
    label: (
      <Link to='/cause-connector'>
        Cause Connector
      </Link>
    ),
    key: 'java-app'
  },
  {
    label: (
      <Link to='/donate'>
        Faire un don
      </Link>
    ),
    key: 'donate'
  },
  {
    label: (
      <Link to='/login'>
        Se connecter
      </Link>
    ),
    key: 'login'
  }
]

export const Header: FC = () => {
  const currentPage = useGlobalStore(state => state.activePage)
  const onClick = (e: MenuItem): void => {
    void setActivePage(e.key)
  }

  return (
    <header className={styles.header}>
      <Link to='/'>
        <img src='/logo.svg' alt='logo' className={styles.logo} />
      </Link>
      <Menu className={styles.menu} selectedKeys={[currentPage]} mode='horizontal'>
        {items.map(item => (
          <Menu.Item key={item.key} onClick={() => onClick(item)}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </header>
  )
}
