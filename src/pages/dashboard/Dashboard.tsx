import { Feed } from '@/components/feed/Feed'
import { refreshFeedAction } from '@/store/feedSlice/actions'
import { useGlobalStore } from '@/store/store'
import { FC, useEffect } from 'react'

const REFRESH_FEED_INTERVAL = 20000

export const Dashboard: FC = () => {
  const associationName = useGlobalStore((state) => state.association?.name)
  useEffect(() => {
    void refreshFeedAction()

    const interval = setInterval(() => {
      void refreshFeedAction()
    }, REFRESH_FEED_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h1>What's happening in {associationName ?? 'the association'}</h1>
      <Feed />
    </div>
  )
}
