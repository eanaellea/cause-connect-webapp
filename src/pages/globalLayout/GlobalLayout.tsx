import { Outlet } from "react-router-dom"

import styles from './GlobalLayout.module.scss'
import { useGlobalStore } from "@/store/store"

export const GlobalLayout = () => {
  const token = useGlobalStore((state) => state.token)
  return (
    <div className={styles.globalContainer}>
      <p>{token}</p>
      {<Outlet />}
    </div>
  )
}