import { StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import { GlobalStore, AssociationSlice } from '../types'

export const initialState: AssociationSlice = {
  association: null
}

export const createAssociationSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
AssociationSlice
> = persist(() => initialState, { name: 'association' })
