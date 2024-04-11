import { FC, useEffect, useState } from 'react'
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider
} from '@stripe/react-connect-js'

import { useGlobalStore } from '@/store/store'
import StripeConnect from './Connect'
import { createAccountWithPlanAction } from '@/store/paymentSlice/actions'

export const StripeSetup: FC = () => {
  const [accountCreatePending, setAccountCreatePending] = useState(false)
  const [onboardingExited, setOnboardingExited] = useState(false)
  const [error, setError] = useState(false)
  const [connectedAccountId, setConnectedAccountId] = useState<string>()
  const stripeConnectInstance = StripeConnect(connectedAccountId)

  useEffect(() => {
    const stripeAccountId = useGlobalStore.getState().payment.stripeAccountId
    if (stripeAccountId !== null) {
      setConnectedAccountId(stripeAccountId)
    } else {
      void createAccount(useGlobalStore.getState().user!.email) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    }
  }, [connectedAccountId])

  const createAccount = async (email: string): Promise<void> => {
    setAccountCreatePending(true)
    setError(false)
    await createAccountWithPlanAction({ email })
      .then((response) => {
        if (response === null) {
          setError(true)
          return
        }
        setAccountCreatePending(false)

        setConnectedAccountId(response.account.id)
      })
      .catch(() => {
        setError(true)
      })
  }

  return (
    <div className='content'>
      {(stripeConnectInstance != null) && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectAccountOnboarding
            onExit={() => setOnboardingExited(true)}
          />
        </ConnectComponentsProvider>
      )}
      {error && <p className='error'>Something went wrong!</p>}
      {(connectedAccountId !== undefined || accountCreatePending || onboardingExited) && (
        <div className='dev-callout'>
          {accountCreatePending && !error && <p>Création de votre compte Stripe en cours</p>}
          {onboardingExited && <p>The Account Onboarding component has exited</p>}
        </div>
      )}
    </div>
  )
}
