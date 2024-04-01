import { query } from '../setup'

export const searchUsersQuery = async (
  search: string
): Promise<any[] | null> => {
  try {
    const result = await query.get('users/search', {
      searchParams: {
        'search-string': search
      }
    })
    const json = await result.json<any[]>()
    return json
  } catch (e) {
    return null
  }
}
