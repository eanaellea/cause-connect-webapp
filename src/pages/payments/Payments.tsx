import { FC, useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

import styles from './Payments.module.scss'
import { StripeSetup } from '@/designSystem/stripe/Setup'
import { isAccountReadyAction } from '@/store/paymentSlice/actions'
import { PaymentSettings } from '@/designSystem/paymentSettings/PaymentSettings'
import { getLateUsersQuery, sendLateUsersReminderQuery } from '@/services/mainApi/queries/payment'
import { UserResponse } from '@/services/mainApi/queries/users'
import toast from 'react-hot-toast'

const columns = [
  {
    title: 'Prénom NOM',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Adresse e-mail',
    dataIndex: 'email',
    key: 'email'
  }
]

export const Payments: FC = () => {
  const [stripeSetupComplete, setStripeSetupComplete] = useState<boolean | null>(null)
  const [stripeSetupExited, setStripeSetupExited] = useState(false)
  const [lateUsers, setLateUsers] = useState<UserResponse[] | null>(null)

  const getAccountStatus = async (): Promise<void> => {
    const status = await isAccountReadyAction()
    setStripeSetupComplete(status)
  }

  const getLateUsers = async (): Promise<void> => {
    setLateUsers(await getLateUsersQuery())
  }

  const sendReminder = async (): Promise<void> => {
    const result = await sendLateUsersReminderQuery({ emails: lateUsers?.map((user) => user.email) ?? [] })
    if (result) {
      toast.success('Rappel envoyé')
      void getLateUsers()
    }
  }

  useEffect(() => {
    void getAccountStatus()
    if (stripeSetupComplete === true) {
      void getLateUsers()
    }
  }, [stripeSetupComplete, stripeSetupExited])

  return (
    <div>
      <h1>Paiements</h1>
      <div className={styles.container}>
        {stripeSetupComplete === false && <StripeSetup onExit={() => setStripeSetupExited(true)} />}
        {
          stripeSetupComplete === true &&
            <>
              <PaymentSettings />
              <section className={styles.lateUsers}>
                <h2>Utilisateurs en retard de paiement</h2>
                <Button type='primary' className={styles.button} onClick={sendReminder}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
                  Envoyer un rappel
                </Button>
                <Table
                  dataSource={lateUsers ?? []}
                  columns={columns}
                />
              </section>
            </>
        }
        {stripeSetupComplete === null && <LoadingOutlined />}
      </div>
    </div>
  )
}
