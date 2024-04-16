import { FC } from 'react'
import { Button } from 'antd'

import { UploadPlugIn } from '@/designSystem/uploadPlugin/UploadPlugIn'
import styles from './JavaApp.module.scss'

export const JavaApp: FC = () => {
  return (
    <main className={styles.main}>
      <span className={styles.background} />
      <section className={styles.download}>
        <h1>Cause Connector</h1>
        <p>Gérez vos projets internes avec notre application</p>
        <Button type='primary'>
          Télécharger
        </Button>
      </section>
      <section className={styles.plugins}>
        <h2>Plug-ins</h2>
        <p>Utilisez votre propre plug-in pour personnaliser l'application</p>
        <UploadPlugIn />
      </section>
    </main>
  )
}
