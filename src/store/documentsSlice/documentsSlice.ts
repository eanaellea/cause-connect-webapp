import { StateCreator } from 'zustand'

import { GlobalStore, DocumentsSlice } from '../types'

export const initialState: DocumentsSlice = {
  documents: []
}

export const createDocumentsSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
DocumentsSlice
> = () => initialState
