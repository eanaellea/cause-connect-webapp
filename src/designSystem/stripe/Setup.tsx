import { FC, useEffect, useState } from 'react'
import {
  ConnectAccountOnboarding,
  ConnectComponentsProvider
} from '@stripe/react-connect-js'

import { useGlobalStore } from '@/store/store'
import StripeConnect from './Connect'
import { createAccountWithProductsAction } from '@/store/paymentSlice/actions'

interface StripeSetupProps {
  onExit: () => void
}

export const StripeSetup: FC<StripeSetupProps> = ({ onExit }) => {
  const [accountCreatePending, setAccountCreatePending] = useState(false)
  const [onboardingExited, setOnboardingExited] = useState(false)
  const [error, setError] = useState(false)
  const [connectedAccountId, setConnectedAccountId] = useState<string>()
  const stripeConnectInstance = StripeConnect(connectedAccountId)
  const stripeAccountId = useGlobalStore((state) => state.payment.stripeAccountId)
  const userEmail = useGlobalStore((state) => state.user?.email)
  if (userEmail === undefined) {
    return null
  }

  useEffect(() => {
    if (stripeAccountId !== null) {
      setConnectedAccountId(stripeAccountId)
    } else {
      void createAccount(userEmail)
    }
  }, [connectedAccountId])

  const createAccount = async (email: string): Promise<void> => {
    setAccountCreatePending(true)
    setError(false)
    await createAccountWithProductsAction({ email })
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

  const handleExit = (): void => {
    setOnboardingExited(true)
    onExit()
  }

  return (
    !onboardingExited &&
      <div className='content'>
        {(stripeConnectInstance != null) && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding
              onExit={handleExit}
            />
          </ConnectComponentsProvider>
        )}
        {error && <p className='error'>Something went wrong!</p>}
        {(connectedAccountId !== undefined || accountCreatePending || onboardingExited) && (
          <div className='dev-callout'>
            {accountCreatePending && !error && <p>Création de votre compte Stripe en cours</p>}
          </div>
        )}
      </div>
  )
}
