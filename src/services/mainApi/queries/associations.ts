import { query } from '../setup'
import { handleError } from '../setup/helpers'

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
    handleError(e as Error)
    return null
  }
}