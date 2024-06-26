import { query } from '../setup'

interface AssociationResponse {
  id: string
  name: string
  logo: string
  description: string
}

export const getAssociationsQuery = async (): Promise<AssociationResponse[] | null> => {
  try {
    const result = await query.get('associations')
    const json = await result.json<AssociationResponse[]>()
    return json
  } catch (e) {
    return null
  }
}
export const getReadyAssociationsQuery = async (): Promise<AssociationResponse[] | null> => {
  try {
    const result = await query.get('associations?ready=true')
    const json = await result.json<AssociationResponse[]>()
    return json
  } catch (e) {
    return null
  }
}

export interface UpdateAssociationBody {
  name: string
  description: string
}

export const updateAssociationQuery = async (
  associationId: string,
  associationBody: UpdateAssociationBody
): Promise<AssociationResponse | null> => {
  try {
    const result = await query.patch(`associations/${associationId}`, {
      json: associationBody
    })
    const association = await result.json<AssociationResponse>()

    return association
  } catch (e) {
    return null
  }
}

export const updateAssociationLogoQuery = async (
  associationId: string,
  associationLogo: File
): Promise<string | null> => {
  try {
    const formData = new FormData()
    formData.append('logo', associationLogo)

    const logoResult = await query.post(`associations/${associationId}/logo`, {
      body: formData
    })
    const response = await logoResult.json<{ logoUrl: string }>()

    return response.logoUrl
  } catch (e) {
    return null
  }
}

export const getAssociationStripeAccountIdQuery = async (
  associationId: string
): Promise<string | null> => {
  try {
    const result = await query.get(`associations/${associationId}/stripe-account-id`)
    const json = await result.json<{ id: string }>()
    return json.id
  } catch (e) {
    return null
  }
}
