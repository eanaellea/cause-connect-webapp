import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'

import { RequestResult } from '@/components/result/RequestResult'
import { CheckoutSessionStatus } from '@/store/paymentSlice/actions'
import { getCheckoutSessionQuery } from '@/services/mainApi/queries/payment'

export const ContributionReturn: FC = () => {
  const [sessionStatus, setSessionStatus] = useState<string | null>(null)

  const { search } = useLocation()
  const params = new URLSearchParams(search)

  useEffect(() => {
    const fetchCheckoutSessionStatus = async (): Promise<void> => {
      const sessionId = params.get('session_id')
      if (sessionId !== null) {
        setSessionStatus((await getCheckoutSessionQuery(sessionId))?.status ?? null)
      }
    }
    void fetchCheckoutSessionStatus()
  }, [])

  return (
    <div>
      {sessionStatus === null && <LoadingOutlined />}
      {sessionStatus === CheckoutSessionStatus.COMPLETE && (
        <RequestResult
          status='success'
          title='Vous avez bien réglé votre contribution !'
          subTitle='Merci pour votre soutien.'
        />
      )}
      {sessionStatus === CheckoutSessionStatus.OPEN && (
        <RequestResult
          status='error'
          title='Une erreur est survenue.'
          subTitle='Votre contribution n’a pas pu être enregistrée. Veuillez réessayer.'
        />
      )}
    </div>
  )
}
