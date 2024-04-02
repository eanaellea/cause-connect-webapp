import { useGlobalStore } from '../store'
import { getUsersFromMyAssociation } from '@/services/mainApi/queries/users'

export const getAssociationMembersAction = async (): Promise<void> => {
  const response = await getUsersFromMyAssociation()

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: response
  }))
}
