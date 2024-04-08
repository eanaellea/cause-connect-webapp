import { EventResponse } from '@/services/mainApi/queries/events'
import { Card } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'
import styles from './EventCard.module.scss'
import { router } from '@/router'

interface Props {
  event: EventResponse
}

export const EventCard: FC<Props> = ({ event }) => {
  const startTime = dayjs(event.startTime)
  const endTime = dayjs(event.endTime)

  return (
    <Card
      title={event.title}
      className={styles.card}
      onClick={() => { void router.navigate(`/app/events/${event.id}`) }}
    >
      <p>
        {event.description}
      </p>
      <p>
        From {startTime.format('HH:mm')} to {endTime.format('HH:mm')}
      </p>
    </Card>
  )
}
