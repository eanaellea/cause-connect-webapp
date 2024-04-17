import { FC } from 'react'
import { Button } from 'antd'

import { UploadPlugIn } from '@/designSystem/uploadPlugin/UploadPlugIn'
import styles from './JavaApp.module.scss'
import { getInstallerQuery } from '@/services/mainApi/queries/javaApp'
import toast from 'react-hot-toast'

export const JavaApp: FC = () => {
  const downloadFile = async (): Promise<void> => {
    try {
      const response = await getInstallerQuery()
      if (response != null) {
        const url = window.URL.createObjectURL(response)

        const link = document.createElement('a')
        link.href = url
        link.download = 'cause-conect-installer.dmg'

        link.click()

        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      toast.error('Une erreur est survenue lors du téléchargement du fichier')
    }
  }

  return (
    <main className={styles.main}>
      <span className={styles.background} />
      <section className={styles.download}>
        <img src='/java-app-logo.svg' alt='java app logo' className={styles.logo} />
        <h1>Cause Connector</h1>
        <p>Gérez vos projets internes avec notre application</p>
        <Button type='primary' onClick={async () => await downloadFile()}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
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
