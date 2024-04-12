import { FC, useState, useEffect } from 'react'
import { Spin } from 'antd'

import styles from './Payments.module.scss'
import { StripeSetup } from '@/designSystem/stripe/Setup'
import { getAccountAction } from '@/store/paymentSlice/actions'
import { PaymentSettings } from '@/designSystem/paymentSettings/PaymentSettings'

export const Payments: FC = () => {
  const [stripeSetupComplete, setStripeSetupComplete] = useState<boolean | null>(null)
  const [stripeSetupExited, setStripeSetupExited] = useState(false)

  const getAccountStatus = async (): Promise<void> => {
    const status = await getAccountAction()
    setStripeSetupComplete(status)
  }

  useEffect(() => {
    void getAccountStatus()
  }, [stripeSetupComplete, stripeSetupExited])

  return (
    <div>
      <h1>Paiements</h1>
      <div className={styles.container}>
        {stripeSetupComplete === false && <StripeSetup onExit={() => setStripeSetupExited(true)} />}
        {stripeSetupComplete === true && <PaymentSettings />}
        {stripeSetupComplete === null && <Spin />}
      </div>
    </div>
  )
}
