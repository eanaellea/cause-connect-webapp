import { FC, useEffect, useState } from 'react'
import { Button } from 'antd'
import { Stripe, loadStripe } from '@stripe/stripe-js'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'

import { SearchableSelect } from '@/designSystem/SearchableSelect'
import { getAssociationStripeAccountIdQuery, getReadyAssociationsQuery } from '@/services/mainApi/queries/associations'
import { Association } from '@/store/types'
import { createDonationCheckoutSessionAction } from '@/store/paymentSlice/actions'
import styles from './PublicDonation.module.scss'

export const PublicDonation: FC = () => {
  const [associations, setAssociations] = useState<Association[] | null>(null)
  const [selectedAssociationId, setSelectedAssociationId] = useState<string | null>(null)
  const [isChoiceMade, setIsChoiceMade] = useState(false)
  const [selectedAssociationStripeAccountId, setSelectedAssociationStripeAccountId] = useState<string | null>(null)
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null)

  const getAssociations = async (): Promise<void> => {
    const associations = await getReadyAssociationsQuery()
    setAssociations(associations)
  }

  useEffect(() => {
    void getAssociations()
  }, [])

  const handleConfirmation = (): void => {
    setIsChoiceMade(true)
  }

  useEffect(() => {
    const getAssociationStripeAccountId = async (associationId: string): Promise<void> => {
      const stripeAccountId = String(await getAssociationStripeAccountIdQuery(associationId))
      setSelectedAssociationStripeAccountId(stripeAccountId)
      setStripePromise(loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY, {
        stripeAccount: stripeAccountId
      }))
    }
    if (isChoiceMade && selectedAssociationId !== null && selectedAssociationStripeAccountId === null) {
      getAssociationStripeAccountId(selectedAssociationId)
        .catch((error) => {
          console.error(error)
        })
    }
  }, [isChoiceMade])

  return (
    <div className={styles.container}>
      <h1>Faire un don</h1>
      {
        !isChoiceMade &&
          <>
            <SearchableSelect
              placeholder='Sélectionner une association'
              options={associations?.map((association) => (
                { value: association.id, label: association.name }
              )) ?? []}
              onChange={(associationId) => {
                setSelectedAssociationId(associationId)
              }}
              loading={associations === null}
            />
            <Button type='primary' onClick={handleConfirmation}>
              Valider
            </Button>
          </>
      }
      {
        isChoiceMade && selectedAssociationStripeAccountId !== null && stripePromise !== null &&
          <>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{
                fetchClientSecret: async () => {
                  const clientSecret = await createDonationCheckoutSessionAction(true, selectedAssociationId)
                  return clientSecret ?? ''
                }
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </>
      }
    </div>
  )
}
