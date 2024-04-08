import { Badge } from 'antd'
import dayjs from 'dayjs'
import { FC } from 'react'

interface Props {
  date: dayjs.Dayjs
  info: any
}

export const DateCellRender: FC<Props> = () => {
  const listData: Array<{ type: 'warning' | 'success' | 'error', content: string }> = [
    {
      type: 'warning',
      content: 'This is warning event'
    },
    {
      type: 'success',
      content: 'This is very long usual event......'
    },
    {
      type: 'error',
      content: 'This is error event 1.'
    },
    {
      type: 'error',
      content: 'This is error event 2.'
    },
    {
      type: 'error',
      content: 'This is error event 3.'
    },
    {
      type: 'error',
      content: 'This is error event 4.'
    }
  ]

  return (
    <ul>
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  )
}
