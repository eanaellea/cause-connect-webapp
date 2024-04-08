import { FC, useEffect } from 'react'
import { Calendar as AntdCalendar, CalendarProps } from 'antd'
import dayjs from 'dayjs'
import styles from './Calendar.module.scss'
import { DateCellRender } from '@/components/calendar/dateCellRender/DateCellRender'
import { refetchEventsAction } from '@/store/eventsSlice/actions'

const dateCellRender: CalendarProps<dayjs.Dayjs>['cellRender'] = (date, info) => (
  <DateCellRender date={date} info={info} />
)

const REFETCH_EVENTS_INTERVAL = 20000

export const Calendar: FC = () => {
  useEffect(() => {
    void refetchEventsAction()
    const interval = setInterval(() => {
      void refetchEventsAction()
    }, REFETCH_EVENTS_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.calendarPage}>
      <AntdCalendar className={styles.calendar} cellRender={dateCellRender} />
    </div>
  )
}
