import { StateCreator } from 'zustand'

import { GlobalStore, UsersSlice } from '../types'

export const initialState: UsersSlice = {
  users: []
}

export const createUsersSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
UsersSlice
> = () => initialState
