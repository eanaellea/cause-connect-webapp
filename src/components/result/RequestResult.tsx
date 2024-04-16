import { FC } from 'react'
import { Result } from 'antd'

interface ResultProps {
  status: 'success' | 'error' | 'warning' | 'info' | '403' | '404' | '500'
  title: string
  subTitle: string
  extra?: React.ReactNode[]
}

export const RequestResult: FC<ResultProps> = ({ status, title, subTitle, extra }: ResultProps) => {
  return (
    <Result
      status={status}
      title={<h1>{title}</h1>}
      subTitle={subTitle}
      extra={extra}
    />
  )
}
