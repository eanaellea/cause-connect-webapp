import { createVote, CreateVoteBody, fetchCurrentBallotResults, fetchPublicVotes, fetchVoteDetails, fetchWinningOption, NewVoteQuestion, openNewBallot, updateVote, UpdateVoteBody } from '@/services/mainApi/queries/votes'
import { useGlobalStore } from '@/store/store'

// Fetch and store public votes
export const fetchPublicVotesAction = async (): Promise<void> => {
  const publicVotes = await fetchPublicVotes()
  if (publicVotes != null) {
    useGlobalStore.setState({ publicVotes })
  }
}

// Create a vote and refresh the public votes list
export const createVoteAction = async (body: CreateVoteBody): Promise<void> => {
  const newVoteResponse = await createVote(body)
  if (newVoteResponse !== null) {
    // while we wait, we just add the new vote to the list of public votes
    useGlobalStore.setState((state) => ({ publicVotes: [...state.publicVotes, newVoteResponse] }))
    // then, we refetch the actual list of public votes
    await fetchPublicVotesAction()
  }
}

// Fetch and store vote details by ID
export const updateCurrentDisplayedVoteAction = async (voteId: string): Promise<void> => {
  const voteDetails = await fetchVoteDetails(voteId)
  if (voteDetails != null) {
    useGlobalStore.setState({ currentDisplayedVote: voteDetails })
  }
}

// Update a vote and refresh the displayed vote details
export const updateAndRefreshVote = async (voteId: string, body: UpdateVoteBody): Promise<void> => {
  const updatedVote = await updateVote(voteId, body)
  if (updatedVote !== null) {
    // do these two things in one setState
    useGlobalStore.setState((state) => ({ ...state, publicVotes: [...(state.publicVotes?.filter((vote) => vote.id !== voteId)), updatedVote] }))
  }
}

// Open a new ballot for a vote and refresh the current vote details
export const openBallotAndRefreshVote = async (voteId: string, newQuestion: NewVoteQuestion): Promise<void> => {
  await openNewBallot(voteId, newQuestion)
  await updateCurrentDisplayedVoteAction(voteId)
}

// Fetch and store current ballot results by vote ID
export const fetchCurrentBallotResultsAction = async (voteId: string): Promise<void> => {
  const currentBallotResults = await fetchCurrentBallotResults(voteId)
  if (currentBallotResults != null) {
    useGlobalStore.setState(() => ({ currentVoteAnswers: currentBallotResults }))
  }
}

// Fetch and store winning option by vote ID
export const fetchWinningOptionAction = async (voteId: string): Promise<void> => {
  const winningOption = await fetchWinningOption(voteId)
  if (winningOption !== null) {
    useGlobalStore.setState(() => ({ currentVoteWinningOption: winningOption.optionId }))
  }
}