import { useGlobalStore } from '../store'
import { getUsersFromMyAssociationQuery, InviteUserBody, inviteUserQuery, UpdateUserBody, updateUserQuery, deleteUserQuery, resetUserPasswordQuery } from '@/services/mainApi/queries/users'

export const getAssociationMembersAction = async (): Promise<void> => {
  const response = await getUsersFromMyAssociationQuery()

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: response.map((user) => ({
      ...user,
      stripeCustomerId: ''
    }))
  }))
}

export const createUserAction = async (createUserBody: InviteUserBody): Promise<void> => {
  const response = await inviteUserQuery(createUserBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: [...state.users, { ...response, stripeCustomerId: '' }]
  }))
}

export const updateUserAction = async (userId: string, updateUserBody: UpdateUserBody): Promise<void> => {
  const response = await updateUserQuery(userId, updateUserBody)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: state.users.map((user) => user.id === userId ? { ...response, stripeCustomerId: '' } : user)
  }))
}

export const deleteUserAction = async (userId: string): Promise<void> => {
  const response = await deleteUserQuery(userId)

  if (response === null) {
    return
  }

  useGlobalStore.setState((state) => ({
    ...state,
    users: state.users.filter((user) => user.id !== userId)
  }))
}

export const resetUserPasswordAction = async (userId: string): Promise<void> => {
  await resetUserPasswordQuery(userId)
}
