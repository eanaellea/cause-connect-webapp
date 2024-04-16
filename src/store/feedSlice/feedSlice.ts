import { StateCreator } from 'zustand'

import { GlobalStore, FeedSlice } from '../types'

export const initialState: FeedSlice = {
  feedItemsById: {},
  feedItemIds: []
}

export const createfeedSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
FeedSlice
> = () => initialState
