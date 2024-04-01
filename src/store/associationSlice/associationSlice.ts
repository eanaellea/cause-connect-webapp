import { StateCreator } from 'zustand'

import { GlobalStore, AssociationSlice } from '../types'
import { persist } from 'zustand/middleware'

export const initialState: AssociationSlice = {
  association: null
}

export const createAssociationSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
AssociationSlice
> = persist(() => initialState, { name: 'association' })
