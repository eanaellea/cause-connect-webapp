import { Outlet } from 'react-router-dom'

import styles from './PublicLayout.module.scss'
import { FC } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const PublicLayout: FC = () => {
  return (
    <div className={styles.publicContainer}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
