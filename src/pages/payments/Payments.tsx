import { FC, useState, useEffect } from 'react'
import { Spin } from 'antd'

import styles from './Payments.module.scss'
import { StripeSetup } from '@/designSystem/stripe/Setup'
import { getAccountAction } from '@/store/paymentSlice/actions'

export const Payments: FC = () => {
  const [stripeSetupComplete, setStripeSetupComplete] = useState<boolean | null>(null)

  const getAccountStatus = async (): Promise<void> => {
    const status = await getAccountAction()
    setStripeSetupComplete(status)
  }

  useEffect(() => {
    void getAccountStatus()
  }, [stripeSetupComplete])

  return (
    <div>
      <h1>Paiements</h1>
      <div className={styles.container}>
        {stripeSetupComplete === false && <StripeSetup />}
        {stripeSetupComplete === true && <p>bravo</p>}
        {stripeSetupComplete === null && <Spin />}
      </div>
    </div>
  )
}
