import { query } from '../setup'
import { NewPollQuestion, PollQuestionResponse, PollQuestionType } from '../types'

export enum VoteStatus {
  NOT_STARTED = 'not_started',
  OPEN = 'open',
  DONE = 'done',
}

export enum VoteVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum VoteAcceptanceCriteria {
  MAJORITY = 'majority',
  TWO_THIRDS = 'two_thirds',
  UNANIMITY = 'unanimity',
}

// Define interfaces for Vote operations
export interface Vote {
  id: string
  title: string
  description: string
  status: VoteStatus
  visibility: VoteVisibility
  minPercentAnswers: number
  acceptanceCriteria: VoteAcceptanceCriteria
}

export interface FullVoteResponse extends Vote {
  question: {
    id: string
    prompt: string
    type: PollQuestionType
    options: Array<{ id: string, content: string }>
  }
}

export interface CreateVoteBody {
  title: string
  description: string
  visibility: string
  minPercentAnswers: number
  acceptanceCriteria: string
  question: NewPollQuestion
}

export interface UpdateVoteBody {
  title?: string
  description?: string
  visibility?: string
  minPercentAnswers?: number
  acceptanceCriteria?: string
}

export interface AnswerVoteBody {
  optionIds: string[]
}

export interface QuestionAnswersCount {
  questionId: string
  optionCounts: QuestionAnswerCount[]
}

export interface QuestionAnswerCount {
  optionId: string
  count: number
}

export interface VoteWinningOption {
  optionId: string
  isValid: boolean
  lastBallotResults: QuestionAnswersCount
}

// Fetch public votes for the user's association
export const fetchVotes = async (): Promise<Vote[] | null> => {
  try {
    const response = await query.get('votes')
    return await response.json<Vote[]>()
  } catch (e) {
    return null
  }
}

// Create a new vote
export const createVote = async (body: CreateVoteBody): Promise<Vote | null> => {
  try {
    const response = await query.post('votes', {
      json: body
    })
    return await response.json<Vote>()
  } catch (e) {
    return null
  }
}

// Fetch full details of a vote by ID
export const fetchVoteDetails = async (voteId: string): Promise<FullVoteResponse | null> => {
  try {
    const response = await query.get(`votes/${voteId}`)
    return await response.json<FullVoteResponse>()
  } catch (e) {
    return null
  }
}

// Update a vote
export const updateVote = async (voteId: string, body: UpdateVoteBody): Promise<Vote | null> => {
  try {
    const response = await query.patch(`votes/${voteId}`, {
      json: body
    })
    return await response.json<Vote>()
  } catch (e) {
    return null
  }
}

// Open a new ballot for a vote
export const openNewBallot = async (voteId: string, newQuestion: NewPollQuestion): Promise<PollQuestionResponse | null> => {
  try {
    const response = await query.post(`votes/${voteId}/ballots`, {
      json: newQuestion
    })

    const question = await response.json<PollQuestionResponse>()

    return question
  } catch (e) {
    return null
  }
}

// Fetch current ballot results by vote ID
export const fetchCurrentBallotResults = async (voteId: string): Promise<QuestionAnswersCount | null> => {
  try {
    const response = await query.get(`votes/${voteId}/results`)
    return await response.json<QuestionAnswersCount>()
  } catch (e) {
    return null
  }
}

// Fetch winning option by vote ID
export const fetchWinningOption = async (voteId: string): Promise<VoteWinningOption | null> => {
  try {
    const response = await query.get(`votes/${voteId}/winning-option`)
    return await response.json<VoteWinningOption>()
  } catch (e) {
    return null
  }
}

// Open a vote
export const openVote = async (voteId: string): Promise<void> => {
  try {
    const response = await query.patch(`votes/${voteId}/open`)
    await response.json<VoteWinningOption>()
  } catch (e) {
  }
}

// Close a vote
export const closeVote = async (voteId: string): Promise<void> => {
  try {
    const response = await query.patch(`votes/${voteId}/close`)
    await response.json<VoteWinningOption>()
  } catch (e) {
  }
}
