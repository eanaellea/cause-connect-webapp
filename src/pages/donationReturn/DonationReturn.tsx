import { FC, useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { RequestResult } from '@/components/result/RequestResult'
import { CheckoutSessionStatus } from '@/store/paymentSlice/actions'
import { getCheckoutSessionQuery } from '@/services/mainApi/queries/payment'
import styles from './DonationReturn.module.scss'

export const DonationReturn: FC = () => {
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
    <div className={styles.container}>
      {sessionStatus === null && <LoadingOutlined />}
      {sessionStatus === CheckoutSessionStatus.COMPLETE && (
        <RequestResult
          status='success'
          title='Merci pour votre don !'
          subTitle='Votre don a bien été enregistré.'
        />
      )}
      {sessionStatus === CheckoutSessionStatus.OPEN && (
        <RequestResult
          status='error'
          title='Une erreur est survenue.'
          subTitle='Votre don n’a pas pu être enregistré. Veuillez réessayer.'
          extra={
            [
              <Button key='retry' type='primary'>
                <Link to='/app/donate' />
              </Button>
            ]
          }
        />
      )}
    </div>
  )
}
