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
}

export interface GlobalStore extends AuthSlice, LayoutSlice, DocumentsSlice, VotesSlice, AssociationSlice, UsersSlice {
}

// useful types for the slices
export interface Document {
  id: string
  title: string
  fileUrl: string
  visibility: 'public' | 'private'
  permissions: string[]
}
