import { useGlobalStore } from '@/store/store'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './EventPage.module.scss'
import { Button, Tag, TagProps } from 'antd'
import { EventVisibility } from '@/services/mainApi/queries/events'
import { EditOutlined } from '@ant-design/icons'
import { EditEventModal } from '@/components/events/editEventModal/EditEventModal'
import { refetchEventsAction } from '@/store/eventsSlice/actions'

const colorPerVisibility: Record<EventVisibility, TagProps['color']> = {
  [EventVisibility.PUBLIC]: 'green',
  [EventVisibility.PRIVATE]: 'red'
}

export const EventPage: FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { eventId } = useParams<{ eventId: string }>()
  const event = useGlobalStore((state) => state.eventsById[eventId ?? ''])
  if (eventId === undefined || event === undefined) {
    void refetchEventsAction()
    return null
  }

  return (
    <>
      <div>
        <h1 className={styles.title}>{event.title} <Button type='primary' icon={<EditOutlined />} onClick={() => setIsEditModalOpen(true)} /></h1>
        <p>{event.description}</p>
        <p>Visibility: <Tag color={colorPerVisibility[event.visibility]}>{event.visibility}</Tag></p>
        <p>From <strong>{dayjs(event.startTime).format('DD/MM/YYYY HH:mm')}</strong> to <strong>{dayjs(event.endTime).format('DD/MM/YYYY HH:mm')}</strong></p>
        {event.summary != null && (
          <p className={styles.summary}>{event.summary}</p>
        )}
      </div>
      <EditEventModal eventId={eventId} open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </>
  )
}
