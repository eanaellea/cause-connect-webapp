import { EventCard } from '@/components/events/eventCard/EventCard'
import { Modal } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'
import styles from './CalendarDateModal.module.scss'
import { useGlobalStore } from '@/store/store'

interface Props {
  date: dayjs.Dayjs
  open: boolean
  onClose: () => void
}

export const CalendarDateModal: FC<Props> = ({ date, open, onClose }) => {
  const events = useGlobalStore((state) => state.eventsByDate[date.format('YYYY-MM-DD')])

  return (
    <Modal
      title={`Events on ${date.format('DD/MM/YYYY')}`}
      onOk={onClose}
      onCancel={onClose}
      open={open}
      destroyOnClose
      className={styles.modal}
      classNames={{ body: styles.body }}
    >
      {events !== undefined
        ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />))
          )
        : (
          <p>No events on this day.</p>
          )}
    </Modal>
  )
}
