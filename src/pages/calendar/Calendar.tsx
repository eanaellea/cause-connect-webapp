import { FC, useEffect, useState } from 'react'
import { Calendar as AntdCalendar, CalendarProps } from 'antd'
import dayjs from 'dayjs'
import styles from './Calendar.module.scss'
import { DateCellRender } from '@/components/calendar/dateCellRender/DateCellRender'
import { refetchEventsAction } from '@/store/eventsSlice/actions'
import { CalendarDateModal } from '@/components/calendar/calendarDateModal/CalendarDateModal'

const dateCellRender: CalendarProps<dayjs.Dayjs>['cellRender'] = (date, info) => (
  <DateCellRender date={date} />
)

const REFETCH_EVENTS_INTERVAL = 20000

export const Calendar: FC = () => {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [clickedDate, setClickedDate] = useState<dayjs.Dayjs | null>(null)

  const handleSelect: CalendarProps<dayjs.Dayjs>['onSelect'] = (date: dayjs.Dayjs, info) => {
    if (info.source !== 'date') {
      return
    }
    setClickedDate(date)
    setIsDateModalOpen(true)
  }

  useEffect(() => {
    void refetchEventsAction()
    const interval = setInterval(() => {
      void refetchEventsAction()
    }, REFETCH_EVENTS_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.calendarPage}>
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
    </div>
  )
}
