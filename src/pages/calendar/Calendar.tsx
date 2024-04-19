import { FC, useEffect, useState } from 'react'
import { Calendar as AntdCalendar, Button, CalendarProps, Tooltip } from 'antd'
import dayjs from 'dayjs'
import styles from './Calendar.module.scss'
import { DateCellRender } from '@/components/calendar/dateCellRender/DateCellRender'
import { refetchEventsAction } from '@/store/eventsSlice/actions'
import { CalendarDateModal } from '@/components/calendar/calendarDateModal/CalendarDateModal'
import { PlusOutlined } from '@ant-design/icons'
import { CreateEventModal } from '@/components/events/createEventModal/CreateEventModal'
import { useGlobalStore } from '@/store/store'

const dateCellRender: CalendarProps<dayjs.Dayjs>['cellRender'] = (date) => (
  <DateCellRender date={date} />
)

const REFETCH_EVENTS_INTERVAL = 20000

export const Calendar: FC = () => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs | null>(null)
  const eventIdsByDate = useGlobalStore((state) => state.eventIdsByDate)

  useEffect(() => {
    void refetchEventsAction()
    const interval = setInterval(() => {
      void refetchEventsAction()
    }, REFETCH_EVENTS_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  const handleSelect: CalendarProps<dayjs.Dayjs>['onSelect'] = (date: dayjs.Dayjs, info) => {
    if (info.source !== 'date') {
      return
    }
    setClickedDate(date)
    setIsDateModalOpen(true)
  }

  // if no entries
  if (eventIdsByDate === undefined) {
    return null
  }

  return (
    <div className={styles.calendarPage}>
      <h1 className={styles.title}>
        Calendrier
        <Tooltip title='Créer un événement'>
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setIsCreateModalOpen(true)} />
        </Tooltip>
      </h1>
      <AntdCalendar
        className={styles.calendar}
        cellRender={dateCellRender}
        onSelect={handleSelect}
      />
      <CalendarDateModal
        open={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        date={clickedDate ?? dayjs()}
      />
      <CreateEventModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}
