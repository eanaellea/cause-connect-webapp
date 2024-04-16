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
