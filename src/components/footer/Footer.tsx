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
    label: (
      <a href="/privacy" target='_self'>
        Politique de confidentialité
      </a>
    ),
		key: 'privacy',
	},
	{
    label: (
      <a href="/cgv" target='_self'>
        Conditions générales de vente
      </a>
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
					<Menu className={styles.legal} mode="horizontal" items={items}/>
				</div>
				<div className={styles.subfooter}>
					2024 © PAT
				</div>
			</footer>
		</>
  )
}