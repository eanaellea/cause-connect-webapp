import { createVote, CreateVoteBody, fetchCurrentBallotResults, fetchVotes, fetchVoteDetails, fetchWinningOption, NewVoteQuestion, openNewBallot, updateVote, UpdateVoteBody, openVote, VoteStatus, closeVote } from '@/services/mainApi/queries/votes'
import { useGlobalStore } from '@/store/store'

// Fetch and store public votes
export const fetchVotesAction = async (): Promise<void> => {
  const publicVotes = await fetchVotes()
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
    await fetchVotesAction()
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
export const updateAndRefreshVoteAction = async (voteId: string, body: UpdateVoteBody): Promise<void> => {
  const updatedVote = await updateVote(voteId, body)
  if (updatedVote !== null) {
    useGlobalStore.setState((state) => (
      {
        ...state,
        publicVotes: [...(state.publicVotes?.filter((vote) => vote.id !== voteId)), updatedVote],
        currentDisplayedVote: (state.currentDisplayedVote !== null) ? { ...state.currentDisplayedVote, updatedVote } : null
      }))
  }
}

// Open a new ballot for a vote and refresh the current vote details
export const openBallotAndRefreshVoteAction = async (voteId: string, newQuestion: NewVoteQuestion): Promise<void> => {
  const ballotQuestion = await openNewBallot(voteId, newQuestion)
  if (ballotQuestion === null) {
    return
  }
  useGlobalStore.setState((state) => ({ ...state, currentDisplayedVote: { ...state.currentDisplayedVote!, question: ballotQuestion } })) // eslint-disable-line @typescript-eslint/no-non-null-assertion
}

// Fetch and store current ballot results by vote ID
export const fetchCurrentBallotResultsAction = async (): Promise<void> => {
  const currentDisplayedVote = useGlobalStore.getState().currentDisplayedVote
  if (currentDisplayedVote == null) {
    return
  }

  const currentBallotResults = await fetchCurrentBallotResults(currentDisplayedVote.id)
  if (currentBallotResults != null) {
    useGlobalStore.setState(() => ({ currentVoteAnswers: currentBallotResults }))
  }
}

// Fetch and store winning option by vote ID
export const fetchWinningOptionAction = async (): Promise<void> => {
  const currentDisplayedVote = useGlobalStore.getState().currentDisplayedVote
  if (currentDisplayedVote === null) {
    return
  }

  const winningOption = await fetchWinningOption(currentDisplayedVote.id)
  if (winningOption !== null) {
    useGlobalStore.setState(() => ({ currentVoteWinningOption: winningOption.optionId, isCurrentVoteWinningOptionValid: winningOption.isValid }))
  }
}

// Open current vote
export const openCurrentVoteAction = async (): Promise<void> => {
  const voteId = useGlobalStore.getState().currentDisplayedVote?.id
  if (voteId == null) {
    return
  }

  await openVote(voteId)
  useGlobalStore.setState((state) => (
    {
      publicVotes: state.publicVotes?.map((vote) => (vote.id === voteId ? { ...vote, status: VoteStatus.OPEN } : vote)),
      currentDisplayedVote: (state.currentDisplayedVote != null) ? { ...state.currentDisplayedVote, status: VoteStatus.OPEN } : null
    }))
}

// Close current vote
export const closeCurrentVoteAction = async (): Promise<void> => {
  const voteId = useGlobalStore.getState().currentDisplayedVote?.id
  if (voteId == null) {
    return
  }

  await closeVote(voteId)
  useGlobalStore.setState((state) => (
    {
      publicVotes: state.publicVotes?.map((vote) => (vote.id === voteId ? { ...vote, status: VoteStatus.DONE } : vote)),
      currentDisplayedVote: (state.currentDisplayedVote != null) ? { ...state.currentDisplayedVote, status: VoteStatus.DONE } : null
    }))
}
