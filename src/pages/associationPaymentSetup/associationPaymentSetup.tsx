import { FC, useState, useEffect } from 'react'
import { Spin } from 'antd'

import styles from './associationPaymentSetup.module.scss'
import { StripeSetup } from '@/designSystem/stripe/Setup'
import { isAccountReadyAction } from '@/store/paymentSlice/actions'
import { PaymentSettings } from '@/designSystem/paymentSettings/PaymentSettings'

export const PaymentsSetup: FC = () => {
  const [stripeSetupComplete, setStripeSetupComplete] = useState<boolean | null>(null)
  const [stripeSetupExited, setStripeSetupExited] = useState(false)

  const getAccountStatus = async (): Promise<void> => {
    const status = await isAccountReadyAction()
    setStripeSetupComplete(status)
  }

  useEffect(() => {
    void getAccountStatus()
  }, [stripeSetupComplete, stripeSetupExited])

  return (
    <div className={styles.container}>
      <h1>Configuration des contributions</h1>
      <div>
        {stripeSetupComplete === false && <StripeSetup onExit={() => setStripeSetupExited(true)} />}
        {stripeSetupComplete === true && <PaymentSettings redirectTo='/app' />}
        {stripeSetupComplete === null && <Spin />}
      </div>
    </div>
  )
}
