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

  await fetchConversationAction()

  useGlobalStore.setState({ loadingChatbotResponse: false })

  return
}

export const resetConversationAction = async (): Promise<void> => {
  const conversation = await resetConversationQuery()

  if (conversation === null) {
    return
  }

  useGlobalStore.setState({ conversation: null })
}
