import { StateCreator } from 'zustand'

import { GlobalStore, VotesSlice } from '../types'

export const initialState: VotesSlice = {
  publicVotes: [],
  currentDisplayedVote: null,
  currentVoteAnswers: null,
  currentVoteWinningOption: null
}

export const createVotesSlice: StateCreator<
GlobalStore,
[['zustand/devtools', never]],
any,
VotesSlice
> = () => initialState
