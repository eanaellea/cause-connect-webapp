import { ChatbotConversation } from '@/components/chatbotConversation/ChatbotConversation'
import { FC } from 'react'
import styles from './Chatbot.module.scss'

export const Chatbot: FC = () => {
  return (
    <div className={styles.chatbotContainer}>
      <ChatbotConversation />
    </div>
  )
}
