import { useGlobalStore } from '@/store/store'
import { Tooltip } from 'antd'
import dayjs from 'dayjs'
import { FC, MouseEvent } from 'react'
import styles from './DateCellRender.module.scss'
import { router } from '@/router'
import { EventResponse } from '@/services/mainApi/queries/events'

interface Props {
  date: dayjs.Dayjs
}

export const DateCellRender: FC<Props> = ({ date }) => {
  const eventIds = useGlobalStore((state) => state.eventIdsByDate[date.format('YYYY-MM-DD')])
  const events = eventIds?.map((eventId) => useGlobalStore((state) => state.eventsById[eventId]))
  if (eventIds === undefined) {
    return <ul />
  }

  const handleEventClick = (clickEvent: MouseEvent<HTMLDivElement>, clickedEvent: EventResponse): void => {
    void router.navigate(`/app/events/${clickedEvent.id}`)
    clickEvent.stopPropagation()
  }

  return (
    <ul
      className={styles.cellContent}
    >
      {events.map((event) => (
        <Tooltip key={event.id} title={event.title}>
          <div className={styles.event} onClick={(e) => handleEventClick(e, event)}>
            {event.title}
          </div>
        </Tooltip>
      ))}
    </ul>
  )
}
