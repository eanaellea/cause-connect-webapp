import { query } from '../setup'
import { UserRole } from './auth'

export interface UserResponse {
  id: string
  fullName: string
  email: string
  role: UserRole
}

export const getUsersFromMyAssociationQuery = async (): Promise<UserResponse[] | null> => {
  try {
    const response = await query.get('users')
    return await response.json<UserResponse[]>()
  } catch (e) {
    return null
  }
}

export interface InviteUserBody {
  firstName: string
  lastName: string
  email: string
  role: string
}

export const inviteUserQuery = async (inviteUserBody: InviteUserBody): Promise<UserResponse | null> => {
  try {
    const creationResponse = await query.post('users', {
      json: {
        ...inviteUserBody,
        firstName: undefined,
        lastName: undefined,
        fullName: `${inviteUserBody.firstName.slice(0, 1).toUpperCase() + inviteUserBody.firstName.slice(1)} ${inviteUserBody.lastName.toUpperCase()}`
      }
    })
    const user = await creationResponse.json<UserResponse>()

    await query.post('users/' + user.id + '/send-password-email')

    return user
  } catch (e) {
    return null
  }
}

export interface UpdateUserBody {
  fullName?: string
  email?: string
  role?: string
}

export const updateUserQuery = async (userId: string, updateUserBody: UpdateUserBody): Promise<UserResponse | null> => {
  try {
    const response = await query.patch('users/' + userId, {
      json: updateUserBody
    })
    return await response.json<UserResponse>()
  } catch (e) {
    return null
  }
}

export const deleteUserQuery = async (userId: string): Promise<UserResponse | null> => {
  try {
    const response = await query.delete('users/' + userId)
    return await response.json<UserResponse>()
  } catch (e) {
    return null
  }
}

export const resetUserPasswordQuery = async (userId: string): Promise<void> => {
  await query.post('users/' + userId + '/send-password-email')
}
