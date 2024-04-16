import { useGlobalStore } from '@/store/store'
import { FC, useEffect, useRef, useState } from 'react'
import styles from './ChatbotConversation.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchConversationAction, sendMessageAction } from '@/store/chatbotSlice/actions'
import { Button, Input } from 'antd'
import { SendOutlined, DeleteOutlined } from '@ant-design/icons'
import { ChatbotConversationMessage } from '../chatbotConversationMessage/ChatbotConversationMessage'
import { ChatbotConversationMessageLoader } from '../chatbotConversationMessage/ChatbotConversationMessageLoader'
import { DeleteChatbotConversationModal } from '../deleteChatbotConversationModal/DeleteChatbotConversationModal'

const sendMessageSchema = z.object({
  message: z.string()
})

const REFETCH_CONVERSATION_INTERVAL = 5000

export const ChatbotConversation: FC = () => {
  const messages = useGlobalStore((state) => state.conversation?.messages)
  const loadingResponse = useGlobalStore((state) => state.loadingChatbotResponse)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { control, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof sendMessageSchema>>({
    resolver: zodResolver(sendMessageSchema)
  })
  const onSubmit: SubmitHandler<z.infer<typeof sendMessageSchema>> = async (data) => {
    await sendMessageAction(data.message)
    reset()
  }

  useEffect(() => {
    void fetchConversationAction()

    const interval = setInterval(() => {
      void fetchConversationAction()
    }, REFETCH_CONVERSATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (divRef.current != null) {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  }, [divRef, messages])

  return (
    <>
      <div className={styles.conversationContainer}>
        <div className={styles.messagesContainer} ref={divRef}>
          {messages?.map((message) => (
            <ChatbotConversationMessage key={message.id} message={message} />
          ))}
          {loadingResponse && <ChatbotConversationMessageLoader />}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}> {/* eslint-disable-line @typescript-eslint/no-misused-promises */}
          <div className={styles.input}>
            <Controller
              name='message'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type='message'
                  placeholder='Ask me a question...'
                />
              )}
            />
            {(errors.message != null) && <span>{errors.message.message}</span>}
          </div>
          <Button type='default' icon={<DeleteOutlined />} onClick={() => setIsDeleteModalOpen(true)} />
          <Button type='primary' htmlType='submit' icon={<SendOutlined />} />
        </form>
      </div>
      <DeleteChatbotConversationModal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </>
  )
}
