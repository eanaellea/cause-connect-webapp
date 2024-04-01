import { query } from '../setup'
import { handleError } from '../setup/helpers'

interface LoginBody {
  email: string
  password: string
  associationId: string
}

interface LoginResponse {
  token: string
}

export const loginQuery = async (
  loginBody: LoginBody
): Promise<LoginResponse | null> => {
  try {
    const result = await query.post('auth/login', {
      json: loginBody
    })
    const json = await result.json<any>()
    return json
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export const fetchMe = async (): Promise<User> => {
  const result = await query.get('users/me')
  const connectedUser = await result.json<User>()
  return connectedUser
}

interface RegisterBody {
  admin: {
    email: string
    firstName: string
    lastName: string
  }
  association: {
    name: string
    description: string
  }
}

interface AssociationResponse {
  id: string
  name: string
  logo: string
  description: string
}

export const registerQuery = async (
  registerBody: RegisterBody,
  associationLogo: File | null
): Promise<AssociationResponse | null> => {
  try {
    const result = await query.post('associations', {
      json: {
        ...registerBody,
        admin: {
          ...registerBody.admin,
          firstName: undefined,
          lastName: undefined,
          fullName: `${registerBody.admin.firstName.slice(0, 1).toUpperCase() + registerBody.admin.firstName.slice(1)} ${registerBody.admin.lastName.toUpperCase()}`
        }
      }
    })
    const association = await result.json<AssociationResponse>()

    if (associationLogo == null) {
      return association
    }

    const formData = new FormData()
    formData.append('file', associationLogo as Blob)
    const logoUrl = await query.post(`associations/${association.id}/logo`, {
      body: formData,
      headers: {}
    })
    const changeLogoResponse = await logoUrl.json<{ logoUrl: string }>()

    association.logo = changeLogoResponse.logoUrl
    return association
  } catch (e) {
    handleError(e as Error)
    return null
  }
}

export interface ResetPasswordBody {
  passwordResetCode: string
  newPassword: string
}

export interface ResetPasswordResponse {
  token: string
}

export const resetPasswordQuery = async (
  resetPasswordBody: ResetPasswordBody
): Promise<ResetPasswordResponse | null> => {
  try {
    const response = await query.post('auth/reset-password', {
      json: resetPasswordBody
    })

    return await response.json<ResetPasswordResponse>()
  } catch (e) {
    handleError(e as Error)
    return null
  }
}
