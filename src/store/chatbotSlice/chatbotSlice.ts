import { StateCreator } from 'zustand'

import { GlobalStore, ChatbotSlice } from '../types'

export const initialState: ChatbotSlice = {
  conversation: null,
  loadingChatbotResponse: false
}

export const createChatbotSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
ChatbotSlice
> = () => initialState
