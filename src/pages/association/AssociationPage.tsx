import { useGlobalStore } from '@/store/store'
import { FC } from 'react'
import { Alert } from 'antd'

import { AssociationCard } from '@/designSystem/associationProfile/AssociationCard'
import styles from './AssociationPage.module.scss'
import { UserInfo } from '@/components/userInfo/UserInfo'

export const AssociationPage: FC = () => {
  const association = useGlobalStore(state => state.association!)

  return (
    <>
      <h1>Association</h1>
      <span className={styles.container}>
        <div className={styles.profile}>
          <h2>Informations</h2>
          <Alert message='Le changement du logo ne demande aucune confirmation.' type='info' showIcon />
          <AssociationCard association={association} />
        </div>
        <div className={styles.invite}>
          <h2>Invitation</h2>
          <UserInfo />
        </div>
      </span>
    </>
  )
}
