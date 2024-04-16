import { useGlobalStore } from '../store'
import { updateAssociationQuery, UpdateAssociationBody, updateAssociationLogoQuery } from '@/services/mainApi/queries/associations'

export const updateAssociationAction = async (associationId: string, associationBody: UpdateAssociationBody): Promise<void> => {
  const response = await updateAssociationQuery(associationId, associationBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    association: response
  }))
}

export const updateAssociationLogoAction = async (associationId: string, associationLogo: File): Promise<void> => {
  const response = await updateAssociationLogoQuery(associationId, associationLogo)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    association: {
      ...state.association!,
      logo: response
    }
  }))
}
