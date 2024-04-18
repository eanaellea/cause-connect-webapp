import { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import { useGlobalStore } from '@/store/store'
import { RequestResult } from '@/components/result/RequestResult'
import styles from './Welcome.module.scss'

export const Welcome: FC = () => {
  const email = useGlobalStore((state) => state.user?.email)

  return (
    <main className={styles.main}>
      <RequestResult
        status='success'
        title='Bienvenue !'
        subTitle={`Vous êtes désormais inscrit•e sur Cause Connect. Un email de confirmation vous a été envoyé à ${email ?? 'votre email'} .`}
        extra={[
          <Button key='first-login' type='primary'>
            <Link to='/first-login'>Se connecter</Link>
          </Button>
        ]}
      />
    </main>
  )
}
