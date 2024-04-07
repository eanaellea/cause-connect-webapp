import { FC } from 'react'
import styles from './ChatbotConversationMessage.module.scss'
import classNames from 'classnames'
import { Spin } from 'antd'

export const ChatbotConversationMessageLoader: FC = () => {
  return (
    <div
      className={classNames(
        styles.message,
        styles.assistantMessage
      )}
    >
      <Spin />
    </div>
  )
}
