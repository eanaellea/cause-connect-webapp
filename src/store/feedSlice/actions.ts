import { FeedItemResponse, getFeedQuery } from '@/services/mainApi/queries/feed'
import { useGlobalStore } from '@/store/store'

export const refreshFeedAction = async (): Promise<void> => {
  const feed = await getFeedQuery()

  if (feed === null) return

  const feedItemsById: Record<string, FeedItemResponse> = feedItemsToFieldItemsById(feed)
  const feedItemIds: string[] = feed.map((feedItem) => feedItem.id)

  useGlobalStore.setState(
    { feedItemsById, feedItemIds }
  )
}

const feedItemsToFieldItemsById = (feedItems: FeedItemResponse[]): Record<string, FeedItemResponse> => {
  return feedItems.reduce<Record<string, FeedItemResponse>>((acc, feedItem) => {
    acc[feedItem.id] = feedItem
    return acc
  }, {})
}
