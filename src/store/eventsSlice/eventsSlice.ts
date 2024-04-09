import { StateCreator } from 'zustand'

import { GlobalStore, EventsSlice } from '../types'

export const initialState: EventsSlice = {
  eventIdsByDate: {},
  eventsById: {}
}

export const createEventsSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
EventsSlice
> = () => initialState
