import { Outlet } from 'react-router-dom'

import styles from './GlobalLayout.module.scss'
import { FC } from 'react'

export const GlobalLayout: FC = () => {
  return (
    <div className={styles.globalContainer}>
      <Outlet />
    </div>
  )
}
