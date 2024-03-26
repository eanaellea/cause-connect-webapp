import { Outlet } from "react-router-dom"

import styles from './GlobalLayout.module.scss'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const GlobalLayout = () => {
  return (
    <div className={styles.globalContainer}>
      <Header />
      {<Outlet />}
      <Footer />
    </div>
  )
}