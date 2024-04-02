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
