import { query } from '../setup'

export type FeedItemType = 'event' | 'meeting' | 'user' | 'vote' | 'survey'

export interface FeedItemResponse {
  id: string
  type: FeedItemType
  title: string
  description: string
  createdAt: Date
}

export const getFeedQuery = async (): Promise<FeedItemResponse[] | null> => {
  try {
    const result = await query.get('feed')
    const feed = await result.json<FeedItemResponse[]>()
    return feed
  } catch (e) {
    return null
  }
}
