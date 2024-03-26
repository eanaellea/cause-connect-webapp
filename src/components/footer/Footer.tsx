import { Menu } from 'antd';
import { LinkedinOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom';
import { useGlobalStore } from '@/store/store';
import { setActivePage } from '@/store/layoutSlice/actions';

import styles from './Footer.module.scss'
import { MenuItem } from '@/types.d.tsx';

const socialMediaItems = [
	{
		icon: <LinkedinOutlined className={styles.socialMediaIcon} />,
		link: 'https://linkedin.com',
	},
	{
		icon: <FacebookOutlined className={styles.socialMediaIcon} />,
		link: 'https://facebook.com',
	},
	{
		icon: <InstagramOutlined className={styles.socialMediaIcon} />,
		link: 'https://instagram.com',
	},
];

const items = [
	{
    label: (
      <a href="/privacy" target='_self'>
        Politique de confidentialité
      </a>
    ),
		key: 'privacy',
	},
	{
    label: (
      <Link to="/cgv">
        Conditions générales de vente
      </Link>
    ),
		key: 'cgv',
	},
	{
    label: (
      <a href="/cgu" target='_self'>
        Conditions générales d'utilisation
      </a>
    ),
		key: 'cgu',
	},
]

export const Footer = () => {
  const currentPage = useGlobalStore(state => state.activePage);
  const onClick = (e: MenuItem) => {
    setActivePage(e.key);
  }

  return (
		<>
			<footer className={styles.footer}>
				<div className={styles.links}>
					<div className={styles.socialMedia}>
						{socialMediaItems.map((item) => (
							<a href={item.link} key={item.link}>
								{item.icon}
							</a>
						))}
					</div>
					<Menu className={styles.legal} selectedKeys={[currentPage]} mode="horizontal">
						{items.map(item => (
							<Menu.Item key={item.key} onClick={() => onClick(item)}>
								{item.label}
							</Menu.Item>
						))}
					</Menu>
				</div>
				<div className={styles.subfooter}>
					2024 © PAT
				</div>
			</footer>
		</>
  )
}