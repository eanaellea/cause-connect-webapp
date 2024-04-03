import { Association } from '@/models/Association'
import { User } from '@/services/mainApi/queries/auth'
import { FullVoteResponse, QuestionAnswersCount, Vote } from '@/services/mainApi/queries/votes'

export interface AuthSlice {
  token: string | null
  user: User | null
}

export interface LayoutSlice {
  isDrawerOpen: boolean
  activePage: string
}

export interface DocumentsSlice {
  documents: Document[]
}

export interface AssociationSlice {
  association: Association | null
}

export interface UsersSlice {
  users: User[]
}

export interface VotesSlice {
  publicVotes: Vote[]
  currentDisplayedVote: FullVoteResponse | null
  currentVoteAnswers: QuestionAnswersCount | null
  currentVoteWinningOption: string | null
  isCurrentVoteWinningOptionValid: boolean | null
}

export interface SurveysSlice {
  surveys: Survey[]
  currentDisplayedSurvey: Survey | null
  currentSurveyResults: SurveyResults | null
}

export interface GlobalStore extends AuthSlice, LayoutSlice, DocumentsSlice, VotesSlice, AssociationSlice, UsersSlice, SurveysSlice {
}

// useful types for the slices
export interface Document {
  id: string
  title: string
  fileUrl: string
  visibility: 'public' | 'private'
  permissions: string[]
}

interface Survey {
  id: string
  title: string
  description: string
  status: string
  visibility: string
  questions?: SurveyQuestion[]
}

interface SurveyQuestion {
  id: string
  prompt: string
  type: string
  options: Array<{ id: string, content: string }>
}

interface SurveyResults {
  // Assuming a structure for survey results; adjust as necessary based on actual data structure
  surveyId: string
  questionsResults: Array<{
    questionId: string
    optionCounts: Array<{
      optionId: string
      count: number
    }>
  }>
}
