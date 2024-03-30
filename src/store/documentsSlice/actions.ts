import { useGlobalStore } from '../store'
import { deleteDocument, generateShareCode, getDocumentById, getMyDocuments, uploadDocument, UploadDocumentBody, useShareCode } from '@/services/mainApi/queries/documents'

export const uploadDocumentAction = async (file: File, body: UploadDocumentBody): Promise<void> => {
  const response = await uploadDocument(file, body)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    documents: [...state.documents, response]
  }))
}

export const generateShareCodeAction = async (documentId: string, permissions: Array<'edit' | 'read'>): Promise<string | null> => {
  const response = await generateShareCode(documentId, { permissions })

  if (response === null) {
    return null
  }

  return response.shareCode
}

export const useShareCodeAction = async (shareCode: string): Promise<void> => {
  const response = await useShareCode(shareCode)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    documents: state.documents.map((doc) =>
      doc.id === response.id ? response : doc
    )
  }))
}

export const getMyDocumentsAction = async (): Promise<void> => {
  const response = await getMyDocuments()

  if (response === null) {
    return
  }

  useGlobalStore.setState(() => ({
    documents: response
  }))
}

export const getDocumentByIdAction = async (documentId: string): Promise<void> => {
  const response = await getDocumentById(documentId)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    // update or add the document to the list
    documents: state.documents.some(doc => doc.id === response.id)
      ? state.documents.map(doc => doc.id === response.id ? response : doc)
      : [...state.documents, response]
  }))
}

export const deleteDocumentAction = async (documentId: string): Promise<void> => {
  const response = await deleteDocument(documentId)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    documents: state.documents.filter((doc) => doc.id !== documentId)
  }))
}
