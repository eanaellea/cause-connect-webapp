import { FC } from 'react'
import { Calendar as AntdCalendar, CalendarProps } from 'antd'
import dayjs from 'dayjs'
import styles from './Calendar.module.scss'
import { DateCellRender } from '@/components/calendar/dateCellRender/DateCellRender'

const dateCellRender: CalendarProps<dayjs.Dayjs>['cellRender'] = (date, info) => (
  <DateCellRender date={date} info={info} />
)

export const Calendar: FC = () => {
  return (
    <div className={styles.calendarPage}>
      <AntdCalendar className={styles.calendar} cellRender={dateCellRender} />
    </div>
  )
}
