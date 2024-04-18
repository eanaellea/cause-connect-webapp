import { FC, useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'

import { createContributionCheckoutSessionAction } from '@/store/paymentSlice/actions'
import { getPaymentDataQuery } from '@/services/mainApi/queries/settings'
import styles from './Subscribe.module.scss'
import { useGlobalStore } from '@/store/store'

export const Subscribe: FC = () => {
  const token = useGlobalStore((state) => state.token)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    if (token === null) {
      return
    }
    const fetchPaymentData = async (): Promise<string> => {
      return String((await getPaymentDataQuery())?.stripeAccountId)
    }

    fetchPaymentData()
      .then(stripeAccountId =>
        setStripePromise(loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY, {
          stripeAccount: stripeAccountId
        })))
      .catch(() => setStripePromise(null))
  }, [token])

  const options = {
    fetchClientSecret: async () => {
      const clientSecret = await createContributionCheckoutSessionAction()
      return clientSecret ?? ''
    }
  }

  return (
    <div className={styles.container}>
      <p>Veuillez payer votre contribution.</p>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
