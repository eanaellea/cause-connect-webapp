import { FC } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js'

import { createDonationCheckoutSessionAction } from '@/store/paymentSlice/actions'
import { getPaymentDataQuery } from '@/services/mainApi/queries/settings'
import styles from './Subscribe.module.scss'

// TODO: use store instead of query
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY, {
  stripeAccount: String((await getPaymentDataQuery())?.stripeAccountId)
})

export const PrivateDonation: FC = () => {
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
