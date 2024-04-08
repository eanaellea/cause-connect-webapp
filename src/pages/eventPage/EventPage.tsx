import { FC } from 'react'
import { useParams } from 'react-router-dom'

export const EventPage: FC = () => {
  const { eventId } = useParams<{ eventId: string }>()

  return <div>Event: {eventId}</div>
}
