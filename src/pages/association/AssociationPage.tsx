import { useGlobalStore } from '@/store/store'
import { FC, useEffect } from 'react'
import { Alert } from 'antd'

import styles from './AssociationPage.module.scss'
import { AssociationCard } from '@/designSystem/associationProfile/AssociationCard'
import { InviteUserForm } from '@/designSystem/inviteUserForm/InviteUserForm'
import { AssociationMembers } from '@/designSystem/associationMembers'
import { getAssociationMembersAction } from '@/store/usersSlice/actions'

export const AssociationPage: FC = () => {
  const REFETCH_DOCUMENTS_INTERVAL = 10000
  const association = useGlobalStore(state => state.association!) /* eslint-disable-line @typescript-eslint/no-non-null-assertion */

  const members = useGlobalStore((state) => state.users).map((user, index) => ({
    key: index,
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role
  }))

  useEffect(() => {
    void getAssociationMembersAction()

    const interval = setInterval(() => {
      void getAssociationMembersAction()
    }, REFETCH_DOCUMENTS_INTERVAL)

    return () => clearInterval(interval)
  }, [])

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
          <InviteUserForm />
        </div>
      </span>
      <h2>Membres de l'association</h2>
      <AssociationMembers members={members} />
    </>
  )
}
