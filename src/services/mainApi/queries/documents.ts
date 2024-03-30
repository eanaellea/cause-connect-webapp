// import needed functions and types
import { query } from '../setup' // replace with your actual query library import
import { handleError } from '../setup/helpers'

export interface UploadDocumentBody {
  title?: string
  visibility: 'public' | 'private'
}

export interface DocumentResponse {
  id: string
  title: string
  fileUrl: string
  visibility: 'public' | 'private'
  permissions: string[]
}

export interface GenerateShareCodeBody {
  permissions: Array<'edit' | 'read'>
}

export interface ShareCodeResponse {
  shareCode: string
}

export const uploadDocument = async (file: File, body: UploadDocumentBody): Promise<DocumentResponse | null> => {
  const formData = new FormData()
  formData.append('file', file as Blob)
  if (body.title !== undefined) {
    formData.append('title', body.title)
  }
  formData.append('visibility', body.visibility)

  try {
    const response = await query.post('documents/upload', {
      body: formData,
      headers: {}
    })
    return await response.json<DocumentResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export const generateShareCode = async (documentId: string, body: GenerateShareCodeBody): Promise<ShareCodeResponse | null> => {
  try {
    const response = await query.post(`documents/${documentId}/generate-share-code`, {
      json: body
    })
    return await response.json<ShareCodeResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export const useShareCode = async (shareCode: string): Promise<DocumentResponse | null> => {
  try {
    const response = await query.post('documents/use-share-code', {
      json: { shareCode }
    })
    return await response.json<DocumentResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export const getMyDocuments = async (): Promise<DocumentResponse[] | null> => {
  try {
    const response = await query.get('documents/me')
    return await response.json<DocumentResponse[]>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export const getDocumentById = async (documentId: string): Promise<DocumentResponse | null> => {
  try {
    const response = await query.get(`documents/${documentId}`)
    return await response.json<DocumentResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export const deleteDocument = async (documentId: string): Promise<DocumentResponse | null> => {
  try {
    const response = await query.delete(`documents/${documentId}`)
    return await response.json<DocumentResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}
