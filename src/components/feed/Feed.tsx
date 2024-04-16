import { FeedItemCard } from '@/components/feed/feedItemCard/FeedItemCard'
import { useGlobalStore } from '@/store/store'
import { FC } from 'react'
import styles from './Feed.module.scss'

export const Feed: FC = () => {
  const feedItemIds = useGlobalStore((state) => state.feedItemIds)

  return (
    <div className={styles.cardsContainer}>
      {feedItemIds.map((feedItemId) => (
        <FeedItemCard key={feedItemId} feedItemId={feedItemId} />
      ))}
    </div>
  )
}
