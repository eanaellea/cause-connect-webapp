export interface AuthSlice {
  token: string | null
  id: string | null
  email: string | null
}

export interface LayoutSlice {
  isDrawerOpen: boolean
  activePage: string
}

export interface DocumentsSlice {
  documents: Document[]
}

export interface GlobalStore extends AuthSlice, LayoutSlice, DocumentsSlice {}

// useful types for the slices
export interface Document {
  id: string
  title: string
  fileUrl: string
  visibility: 'PUBLIC' | 'PRIVATE'
  permissions: string[]
}
