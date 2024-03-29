import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice } from './authSlice/authSlice'
import { createLayoutSlice } from './layoutSlice/layoutSlice'
import { GlobalStore } from './types'
import { createDocumentsSlice } from './documentsSlice/documentsSlice'

export const useGlobalStore = create<GlobalStore>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createLayoutSlice(...a),
    ...createDocumentsSlice(...a)
  }))
)
