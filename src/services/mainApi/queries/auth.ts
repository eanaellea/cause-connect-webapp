import { query } from '../setup'
import { handleError } from '../setup/helpers'

export const loginQuery = async (
  body: any
): Promise<any | null> => {
  try {
    const result = await query.post('auth/login', {
      json: body
    })
    const json = await result.json<any>()
    return json
  } catch (e) {
    handleError(e as Error)
    return null
  }
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
