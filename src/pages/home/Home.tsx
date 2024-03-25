import { FC } from 'react'
import { Button } from 'antd'

import styles from './Home.module.scss'

export const Home: FC = () => {
  return (
    <>
      <span className={styles.background}></span>
      <section className={styles.gettingStarted}>
        <h2>La gestion de votre association, simplifiée</h2>
        <Button type="primary">Démarrage</Button>
      </section>
    </>
  )
}
