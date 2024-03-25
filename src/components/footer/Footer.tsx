import { useState } from 'react';
import { Menu } from 'antd';
import { LinkedinOutlined, FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import styles from './Footer.module.scss'

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
		label: 'Politique de confidentialité',
		key: 'privacy',
	},
	{
		label: 'Conditions générales de vente',
		key: 'cgv',
	},
	{
		label: 'Conditions générales d\'utilisation',
		key: 'cgu',
	},
]

export const Footer = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
      setCurrent(e.key);
  };

  return (
		<footer className={styles.footer}>
			<div className={styles.links}>
				<div className={styles.socialMedia}>
					{socialMediaItems.map((item) => (
						<a href={item.link} key={item.link}>
							{item.icon}
						</a>
					))}
				</div>
				<Menu onClick={onClick} mode="horizontal" items={items} className={styles.legal}/>
			</div>
			<div className={styles.subfooter}>
				2024 © PAT
			</div>
		</footer>
  )
}