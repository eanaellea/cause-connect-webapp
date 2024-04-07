import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice } from './authSlice/authSlice'
import { createLayoutSlice } from './layoutSlice/layoutSlice'
import { GlobalStore } from './types'
import { createDocumentsSlice } from './documentsSlice/documentsSlice'
import { createVotesSlice } from './votesSlice/votesSlice'
import { createAssociationSlice } from './associationSlice/associationSlice'
import { createUsersSlice } from './usersSlice/usersSlice'
import { createSurveysSlice } from './surveysSlice/surveysSlice'
import { createChatbotSlice } from './chatbotSlice/chatbotSlice'

export const useGlobalStore = create<GlobalStore>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createLayoutSlice(...a),
    ...createDocumentsSlice(...a),
    ...createVotesSlice(...a),
    ...createAssociationSlice(...a),
    ...createUsersSlice(...a),
    ...createSurveysSlice(...a),
    ...createChatbotSlice(...a)
  }))
)
