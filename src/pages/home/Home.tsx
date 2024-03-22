import { FC } from 'react'
import styles from './Home.module.scss'
import { useGlobalStore } from '@/store/store'
import { setTokenAction } from '@/store/authSlice/actions'


export const Home: FC = () => {
  const token = useGlobalStore((state) => state.token)

  return (
    <div>
      <h1 className={styles.title}>Home</h1>
      <input type="text" value={token ?? ""} onChange={(e) => setTokenAction(e.target.value)} />
    </div>
  )
}
