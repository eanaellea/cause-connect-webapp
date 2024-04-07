import { StateCreator } from 'zustand'

import { GlobalStore, SettingsSlice } from '../types'

export const initialState: SettingsSlice = {
  theme: null,
  contributionPrice: null,
  contributionInterval: null
}

export const createSettingsSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
SettingsSlice
> = () => initialState
