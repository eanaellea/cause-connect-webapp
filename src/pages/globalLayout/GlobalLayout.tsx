import { Outlet } from "react-router-dom"

import styles from './GlobalLayout.module.scss'

export const GlobalLayout = () => {
  return (
    <div className={styles.globalContainer}>
      {<Outlet />}
    </div>
  )
}