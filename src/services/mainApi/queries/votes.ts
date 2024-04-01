// Assuming the same structure for the imports and store manipulation as in the previous examples.

import { query } from '../setup'

// Define interfaces for Vote operations
export interface Vote {
  id: string
  title: string
  description: string
  status: string
  visibility: string
  minPercentAnswers: number
  acceptanceCriteria: string
}

export interface FullVoteResponse extends Vote {
  question: {
    id: string
    prompt: string
    type: string
    options: Array<{ id: string, content: string }>
  }
}

export enum PollQuestionType {
  SINGLE_CHOICE = 'single_choice',
  MULTIPLE_CHOICE = 'mutliple_choice',
}

export interface NewVoteQuestion {
  prompt: string
  type: PollQuestionType
  options: Array<{ content: string }>
}

export interface CreateVoteBody {
  title: string
  description: string
  visibility: string
  minPercentAnswers: number
  acceptanceCriteria: string
  question: NewVoteQuestion
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
export const fetchPublicVotes = async (): Promise<Vote[] | null> => {
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
export const openNewBallot = async (voteId: string, newQuestion: NewVoteQuestion): Promise<void> => {
  try {
    await query.post(`votes/${voteId}/ballots`, {
      json: newQuestion
    })
  } catch (e) {
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
