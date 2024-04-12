import { User } from '@/services/mainApi/queries/auth'
import { ChatbotConversationResponse } from '@/services/mainApi/queries/chatbot'
import { EventResponse } from '@/services/mainApi/queries/events'
import { FeedItemResponse } from '@/services/mainApi/queries/feed'
import { FullSurveyResponse, SurveyVisibility } from '@/services/mainApi/queries/surveys'
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
  currentDisplayedSurvey: FullSurveyResponse | null
  currentSurveyResults: SurveyResults | null
}

export interface ChatbotSlice {
  conversation: ChatbotConversationResponse | null
  loadingChatbotResponse: boolean
}

export interface SettingsSlice {
  payment: PaymentData
  theme: Theme
}

export interface EventsSlice {
  eventIdsByDate: Record<string, string[]>
  eventsById: Record<string, EventResponse>
}

export interface FeedSlice {
  feedItemsById: Record<string, FeedItemResponse>
  feedItemIds: string[]
}

export interface GlobalStore extends
  AuthSlice,
  LayoutSlice,
  DocumentsSlice,
  VotesSlice,
  AssociationSlice,
  UsersSlice,
  SurveysSlice,
  ChatbotSlice,
  SettingsSlice,
  EventsSlice,
  FeedSlice
{}

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
  visibility: SurveyVisibility
  questions?: SurveyQuestion[]
}

interface SurveyQuestion {
  id: string
  prompt: string
  type: string
  options: Array<{ id: string, content: string }>
}

type SurveyResults = Array<{
  questionId: string
  optionCounts: Array<{
    optionId: string
    count: number
  }>
}>

interface PaymentData {
  id: string | null
  stripeAccountId: string | null
  stripeProductId: string | null
  contributionPrice: number | null
}

export interface Association {
  id: string
  name: string
  logo?: string
  description: string
}

interface Theme {
  id: string | null
  color: string | null
  font: string | null
}
