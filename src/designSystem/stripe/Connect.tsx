import { useState, useEffect } from 'react'
import { StripeConnectInstance, loadConnectAndInitialize } from '@stripe/connect-js'

import { createAccountSessionAction } from '@/store/paymentSlice/actions'
import { router } from '@/router'

export default function StripeConnect (connectedAccountId: string | undefined): StripeConnectInstance | null {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<StripeConnectInstance | null>(null)

  const fetchClientSecret = async (): Promise<string> => {
    const clientSecret = await createAccountSessionAction()
    if (clientSecret === null) {
      // TODO: redirect to error page
      await router.navigate('/welcome')
      return ''
    }
    return clientSecret
  }

  // TODO: get color dinamically
  useEffect(() => {
    if (connectedAccountId === undefined) {
      return
    }
    setStripeConnectInstance(
      loadConnectAndInitialize({
        publishableKey: import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY,
        fetchClientSecret,
        appearance: {
          overlays: 'dialog',
          variables: {
            colorPrimary: '#1677FF'
          }
        }
      })
    )
  }, [connectedAccountId])

  return stripeConnectInstance ?? null
}
