import { FC, useEffect, useState } from 'react'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'

import { createDonationCheckoutSessionAction } from '@/store/paymentSlice/actions'
import { getPaymentDataQuery } from '@/services/mainApi/queries/settings'
import styles from './PrivateDomation.module.scss'
import { useGlobalStore } from '@/store/store'

export const PrivateDonation: FC = () => {
  const token = useGlobalStore((state) => state.token)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  useEffect(() => {
    if (token === null) {
      return
    }
    const fetchPaymentData = async (): Promise<string> => {
      return String((await getPaymentDataQuery())?.stripeAccountId)
    }

    console.log('poney arc en ciel')
    fetchPaymentData()
      .then(stripeAccountId =>
        setStripePromise(loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY, {
          stripeAccount: stripeAccountId
        })))
      .catch(() => setStripePromise(null))
  }, [token])

  const options = {
    fetchClientSecret: async () => {
      const clientSecret = await createDonationCheckoutSessionAction(false, null)
      return clientSecret ?? ''
    }
  }

  return (
    <div className={styles.container}>
      <h1>Don</h1>
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
