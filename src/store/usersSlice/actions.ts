import { useGlobalStore } from '../store'
import { getUsersFromMyAssociation, InviteUserBody, inviteUser } from '@/services/mainApi/queries/users'

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

export const createUserAction = async (createUserBody: InviteUserBody): Promise<void> => {
  const response = await inviteUser(createUserBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: [...state.users, response]
  }))
}
