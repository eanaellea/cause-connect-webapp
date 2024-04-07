import { FC } from 'react'
import styles from './ChatbotConversationMessage.module.scss'
import { ChatbotChatRole, ChatbotConversationMessageResponse } from '@/services/mainApi/queries/chatbot'
import classNames from 'classnames'

interface Props {
  message: ChatbotConversationMessageResponse
}

export const ChatbotConversationMessage: FC<Props> = ({ message }) => {
  return (
    <div
      className={classNames(
        styles.message,
        {
          [styles.userMessage]: message.role === ChatbotChatRole.USER,
          [styles.assistantMessage]: message.role === ChatbotChatRole.ASSISTANT
        }
      )}
    >
      {message.content}
    </div>
  )
}
