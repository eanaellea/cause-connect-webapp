import { StateCreator } from 'zustand'

import { GlobalStore, SettingsSlice } from '../types'

export const initialState: SettingsSlice = {
  payment: {
    id: null,
    stripeAccountId: null,
    stripeContributionId: null,
    stripeDonationId: null,
    contributionPrice: null
  },
  theme: {
    id: null,
    color: null,
    font: null
  }
}

export const createSettingsSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
SettingsSlice
> = () => initialState
