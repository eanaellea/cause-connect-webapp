/*
import { query } from '../setup'

export interface ChatbotConversationMessageResponse {
  id: string
  role: ChatbotChatRole
  content: string
  createdAt: Date
}

export interface ChatbotConversationResponse {
  id: string
  messages: ChatbotConversationMessageResponse[]
}

interface ChatbotAnswerResponse {
  question: ChatbotConversationMessageResponse
  answer: ChatbotConversationMessageResponse
}

export enum ChatbotChatRole {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export const getConversationQuery = async (): Promise<ChatbotConversationResponse | null> => {
  try {
    const result = await query.get('chatbot/conversation')
    const conversation = await result.json<ChatbotConversationResponse>()
    return conversation
  } catch (e) {
    return null
  }
}

export const sendMessageQuery = async (
  messageContent: string
): Promise<ChatbotAnswerResponse | null> => {
  try {
    const result = await query.post('chatbot/send-question', {
      json: { question: messageContent }
    })
    const message = await result.json<ChatbotAnswerResponse>()
    return message
  } catch (e) {
    return null
  }
}

export const resetConversationQuery = async (): Promise<ChatbotConversationResponse | null> => {
  try {
    const result = await query.delete('chatbot/reset')
    const conversation = await result.json<ChatbotConversationResponse>()
    return conversation
  } catch (e) {
    return null
  }
}

*/

import { ChatbotChatRole, ChatbotConversationMessageResponse, getConversationQuery, resetConversationQuery, sendMessageQuery } from '@/services/mainApi/queries/chatbot'
import { useGlobalStore } from '../store'

export const fetchConversationAction = async (): Promise<void> => {
  const conversation = await getConversationQuery()

  if (conversation === null) {
    return
  }

  useGlobalStore.setState({ conversation })
}

export const sendMessageAction = async (messageContent: string): Promise<void> => {
  useGlobalStore.setState((state) => {
    const fakeMessage: ChatbotConversationMessageResponse = { id: 'temp', role: ChatbotChatRole.USER, content: messageContent, createdAt: new Date() }

    if (state.conversation === null) return { conversation: { id: 'temp', messages: [fakeMessage] } }

    return {
      ...state,
      loadingChatbotResponse: true,
      conversation: {
        ...state.conversation,
        messages: state.conversation?.messages.concat(fakeMessage) ?? [fakeMessage]
      }
    }
  })
  const exchange = await sendMessageQuery(messageContent)

  if (exchange === null) {
    return
  }

  const conversation = useGlobalStore.getState().conversation
  if (conversation === null) {
    await fetchConversationAction()
    return
  }

  const newMessages = conversation.messages
    .filter((message) => message.id !== 'temp')
    .concat([exchange.question, exchange.answer])

  useGlobalStore.setState({
    loadingChatbotResponse: false,
    conversation: {
      ...conversation,
      messages: newMessages
    }
  })
}

export const resetConversationAction = async (): Promise<void> => {
  const conversation = await resetConversationQuery()

  if (conversation === null) {
    return
  }

  useGlobalStore.setState({ conversation: null })
}
