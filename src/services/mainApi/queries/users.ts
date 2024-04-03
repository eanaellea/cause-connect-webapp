import { query } from '../setup'
import { UserRole } from './auth'

interface UserResponse {
  id: string
  fullName: string
  email: string
  role: UserRole
}

export const getUsersFromMyAssociation = async (): Promise<UserResponse[] | null> => {
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

export const inviteUser = async (inviteUserBody: InviteUserBody): Promise<UserResponse | null> => {
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
