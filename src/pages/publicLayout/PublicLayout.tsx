import { Outlet } from "react-router-dom"

import styles from './PublicLayout.module.scss'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const PublicLayout = () => {
  return (
    <div className={styles.publicContainer}>
    <Header />
    {<Outlet />}
    <Footer />
    </div>
  )
}