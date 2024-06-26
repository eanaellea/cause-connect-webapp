import { StateCreator } from 'zustand'

import { GlobalStore, LayoutSlice } from '../types'

export const initialState: LayoutSlice = {
  isDrawerOpen: false,
  activePage: 'home'
}

export const createLayoutSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
LayoutSlice
> = () => initialState
