import { StateCreator } from 'zustand'

import { GlobalStore, PluginsSlice } from '../types'

export const initialState: PluginsSlice = {
  plugins: []
}

export const createPlugInsSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
PluginsSlice
> = () => initialState
