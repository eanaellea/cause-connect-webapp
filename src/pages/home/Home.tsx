import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from 'antd'
import { UserOutlined, CalendarOutlined, CreditCardOutlined, FileOutlined } from '@ant-design/icons'

import styles from './Home.module.scss'

const { Meta } = Card

const features = [
  {
    title: 'Gestion des membres',
    description: 'Gérez les membres de votre association, ajoutez, modifiez, supprimez des membres en quelques clics.',
    img: <UserOutlined className={styles.featureIcon} />
  },
  {
    title: 'Gestion des événements',
    description: 'Créez des événements, invitez des membres, gérez les inscriptions, et bien plus.',
    img: <CalendarOutlined className={styles.featureIcon} />
  },
  {
    title: 'Gestion des cotisations',
    description: 'Créez des cotisations, suivez les paiements, et générez des reçus fiscaux.',
    img: <CreditCardOutlined className={styles.featureIcon} />
  },
  {
    title: 'Gestion des documents',
    description: 'Partagez des documents, créez des dossiers, et gérez les droits d\'accès.',
    img: <FileOutlined className={styles.featureIcon} />
  }
]

export const Home: FC = () => {
  return (
    <main className={styles.main}>
      <span className={styles.background} />
      <section className={styles.gettingStarted}>
        <h2>La gestion de votre association, simplifiée</h2>
        <p>Autant manger la grenouille maintenant</p>
        <Button type='primary'>
          <Link to='/register'>Créer un compte</Link>
        </Button>
      </section>
      <section className={styles.features} id='features'>
        <h2>Fonctionnalités</h2>
        <div className={styles.featuresList}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              className={styles.feature}
              cover={feature.img}
            >
              <Meta title={feature.title} description={feature.description} />
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
