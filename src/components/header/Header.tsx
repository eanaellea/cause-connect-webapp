import { useState } from 'react'
import { Menu } from 'antd'
import styles from './Header.module.scss'

const items = [
  {
    label: 'Accueil',
    key: 'home',
  },
  {
    label: (
      <a href="#features" target='_self'>
        Features
      </a>
    ),
    key: 'features',
  },
  {
    label: (
      <a href="/login" target='_self'>
        Se connecter
      </a>
    ),
    key: 'login',
  },
];

export const Header = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
      <header className={styles.header}>
        <img src="/logo.svg" alt="logo" className={styles.logo}/>
        <Menu onClick={onClick} className={styles.menu} selectedKeys={['home']} mode="horizontal" items={items} />
      </header>
  )
}