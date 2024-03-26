import { Menu } from 'antd'
import { Link } from 'react-router-dom';
import { useGlobalStore } from '@/store/store';
import { setActivePage } from '@/store/layoutSlice/actions';
import styles from './Header.module.scss'

const items = [
  {
    label: (
      <a href="/" target='_self'>
        Accueil
      </a>
    ),
    key: 'home',
  },
  {
    label: (
      <a href="/#features" target='_self'>
        Features
      </a>
    ),
    key: 'features',
  },
  {
    label: (
      <Link to="/login">
        Se connecter
      </Link>
    ),
    key: 'login',
  },
];

export const Header = () => {
  const currentPage = useGlobalStore(state => state.activePage);
  const onClick = (e: any) => {
    setActivePage(e.key);
  }

  return (
    <header className={styles.header}>
      <img src="/logo.svg" alt="logo" className={styles.logo}/>
      <Menu onClick={onClick} className={styles.menu} selectedKeys={[currentPage]} mode="horizontal" items={items} />
    </header>
  )
}